import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { findRegistration, RECEIPTS_DIR, updateRegistration } from "@/lib/storage";

export const runtime = "nodejs";

const ALLOWED = new Map<string, string>([
  ["application/pdf", "pdf"],
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

const MAX_BYTES = 5 * 1024 * 1024; // 5MB

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const id = String(form.get("id") || "").trim();
    const email = String(form.get("email") || "").trim();
    const file = form.get("file");

    if (!id || !email || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Registration ID, email and a file are required." },
        { status: 400 },
      );
    }

    const reg = await findRegistration(id, email);
    if (!reg) {
      return NextResponse.json(
        { error: "No registration found for that ID and email." },
        { status: 404 },
      );
    }

    const ext = ALLOWED.get(file.type);
    if (!ext) {
      return NextResponse.json(
        { error: "Unsupported file type. Use PDF, JPG, PNG or WebP." },
        { status: 400 },
      );
    }

    const buf = Buffer.from(await file.arrayBuffer());
    if (buf.byteLength > MAX_BYTES) {
      return NextResponse.json({ error: "File too large (max 5 MB)." }, { status: 400 });
    }

    await fs.mkdir(RECEIPTS_DIR, { recursive: true });
    const filename = `${reg.id}.${ext}`;
    const fullPath = path.join(RECEIPTS_DIR, filename);
    await fs.writeFile(fullPath, buf);

    await updateRegistration(reg.id, {
      receiptPath: filename,
      receiptUploadedAt: new Date().toISOString(),
      paymentStatus: reg.paymentStatus === "paid" ? "paid" : "pending",
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
