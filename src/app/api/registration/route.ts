import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { addRegistration, RECEIPTS_DIR, updateRegistration } from "@/lib/storage";
import { CATEGORY_LABEL, FEES, SCHOOLS, computeFee, type Category, type Tier } from "@/lib/fees";

export const runtime = "nodejs";

const TIERS: Tier[] = ["early", "standard", "onsite"];

const ALLOWED_MIME = new Map<string, string>([
  ["application/pdf", "pdf"],
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);
const MAX_RECEIPT_BYTES = 5 * 1024 * 1024;

function pickString(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v : "";
}

export async function POST(req: Request) {
  try {
    const ct = req.headers.get("content-type") || "";
    let b: Record<string, unknown>;
    let receipt: File | null = null;

    if (ct.includes("multipart/form-data")) {
      const fd = await req.formData();
      const f = fd.get("receipt");
      if (f instanceof File && f.size > 0) receipt = f;
      let schools: string[] = [];
      const schoolsField = fd.get("schools");
      if (typeof schoolsField === "string" && schoolsField) {
        try {
          const parsed = JSON.parse(schoolsField);
          if (Array.isArray(parsed)) schools = parsed.filter((s) => typeof s === "string");
        } catch {
          schools = [schoolsField];
        }
      } else {
        schools = fd.getAll("schools").filter((v): v is string => typeof v === "string");
      }
      b = {
        firstName: pickString(fd.get("firstName")),
        lastName: pickString(fd.get("lastName")),
        email: pickString(fd.get("email")),
        phone: pickString(fd.get("phone")),
        affiliation: pickString(fd.get("affiliation")),
        position: pickString(fd.get("position")),
        country: pickString(fd.get("country")),
        category: pickString(fd.get("category")),
        tier: pickString(fd.get("tier")),
        accompanying: pickString(fd.get("accompanying")),
        accompanyingNames: pickString(fd.get("accompanyingNames")),
        dietary: pickString(fd.get("dietary")),
        visaLetter: pickString(fd.get("visaLetter")) === "true",
        billing: pickString(fd.get("billing")),
        payment: pickString(fd.get("payment")),
        notes: pickString(fd.get("notes")),
        schools,
      };
    } else {
      b = await req.json();
    }

    const required = ["firstName", "lastName", "email", "affiliation", "country", "category", "tier", "payment"];
    for (const k of required) {
      const v = b?.[k];
      if (!v || typeof v !== "string" || !v.trim()) {
        return NextResponse.json({ error: `Field ${k} is required.` }, { status: 400 });
      }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email as string)) {
      return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    }
    if (!(b.category as string in CATEGORY_LABEL)) {
      return NextResponse.json({ error: "Invalid category." }, { status: 400 });
    }
    if (!TIERS.includes(b.tier as Tier)) {
      return NextResponse.json({ error: "Invalid tier." }, { status: 400 });
    }

    const accompanying = Math.max(0, Math.min(4, parseInt(String(b.accompanying ?? "0"), 10) || 0));
    const schools = Array.isArray(b.schools)
      ? (b.schools as unknown[]).filter((s): s is string => typeof s === "string" && SCHOOLS.includes(s))
      : [];

    const fee = computeFee(b.category as Category, b.tier as Tier, accompanying);
    const expected =
      FEES[b.category as Category][b.tier as Tier] +
      accompanying * FEES.accompanying[b.tier as Tier];
    if (fee !== expected) {
      return NextResponse.json({ error: "Fee mismatch." }, { status: 400 });
    }

    // Validate receipt before persisting registration so we can reject early.
    let receiptExt: string | undefined;
    if (receipt) {
      receiptExt = ALLOWED_MIME.get(receipt.type);
      if (!receiptExt) {
        return NextResponse.json(
          { error: "Unsupported receipt file type. Use PDF, JPG, PNG or WebP." },
          { status: 400 },
        );
      }
      if (receipt.size > MAX_RECEIPT_BYTES) {
        return NextResponse.json({ error: "Receipt file too large (max 5 MB)." }, { status: 400 });
      }
    }

    const entry = await addRegistration({
      firstName: String(b.firstName).slice(0, 100),
      lastName: String(b.lastName).slice(0, 100),
      email: String(b.email).slice(0, 200),
      phone: b.phone ? String(b.phone).slice(0, 50) : undefined,
      affiliation: String(b.affiliation).slice(0, 200),
      position: String(b.position || "").slice(0, 100),
      country: String(b.country).slice(0, 100),
      category: b.category as string,
      tier: b.tier as string,
      fee,
      schools,
      accompanying,
      accompanyingNames: b.accompanyingNames ? String(b.accompanyingNames).slice(0, 500) : undefined,
      dietary: b.dietary ? String(b.dietary).slice(0, 500) : undefined,
      visaLetter: !!b.visaLetter,
      billing: b.billing ? String(b.billing).slice(0, 500) : undefined,
      payment: String(b.payment).slice(0, 100),
      notes: b.notes ? String(b.notes).slice(0, 2000) : undefined,
    });

    if (receipt && receiptExt) {
      const buf = Buffer.from(await receipt.arrayBuffer());
      await fs.mkdir(RECEIPTS_DIR, { recursive: true });
      const filename = `${entry.id}.${receiptExt}`;
      await fs.writeFile(path.join(RECEIPTS_DIR, filename), buf);
      await updateRegistration(entry.id, {
        receiptPath: filename,
        receiptUploadedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({ ok: true, id: entry.id, fee, receiptUploaded: !!receipt });
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
