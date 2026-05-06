import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { ABSTRACTS_DIR, addAbstract, updateAbstract } from "@/lib/storage";
import { TOPICS } from "@/lib/topics";

export const runtime = "nodejs";

const PRESENTATION = ["oral", "poster", "either"];
const ALLOWED_MIME = new Map<string, string>([
  ["application/pdf", "pdf"],
]);
const MAX_BYTES = 5 * 1024 * 1024;

function s(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v : "";
}

function bool(v: FormDataEntryValue | null): boolean {
  return v === "true" || v === "on";
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export async function POST(req: Request) {
  try {
    const fd = await req.formData();

    const data = {
      submittingAuthor: s(fd.get("submittingAuthor")).trim(),
      email: s(fd.get("email")).trim(),
      affiliation: s(fd.get("affiliation")).trim(),
      country: s(fd.get("country")).trim(),
      coAuthors: s(fd.get("coAuthors")).trim(),
      title: s(fd.get("title")).trim(),
      abstract: s(fd.get("abstract")).trim(),
      keywords: s(fd.get("keywords")).trim(),
      topic: s(fd.get("topic")).trim(),
      presentationPref: s(fd.get("presentationPref")).trim(),
      funding: s(fd.get("funding")).trim(),
      comments: s(fd.get("comments")).trim(),
      originalWork: bool(fd.get("originalWork")),
      shareWithReviewers: bool(fd.get("shareWithReviewers")),
    };
    const file = fd.get("file");
    const upload = file instanceof File && file.size > 0 ? file : null;

    // Required fields
    const required = [
      "submittingAuthor",
      "email",
      "affiliation",
      "country",
      "title",
      "abstract",
      "keywords",
      "topic",
      "presentationPref",
    ] as const;
    for (const k of required) {
      if (!data[k]) return NextResponse.json({ error: `Field "${k}" is required.` }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    }
    if (!(TOPICS as readonly string[]).includes(data.topic)) {
      return NextResponse.json({ error: "Invalid topic." }, { status: 400 });
    }
    if (!PRESENTATION.includes(data.presentationPref)) {
      return NextResponse.json({ error: "Invalid presentation preference." }, { status: 400 });
    }
    if (!data.originalWork) {
      return NextResponse.json(
        { error: "Please confirm the originality declaration." },
        { status: 400 },
      );
    }
    const wc = wordCount(data.abstract);
    if (wc < 50 || wc > 350) {
      return NextResponse.json(
        { error: `Abstract should be 50–350 words (you submitted ${wc}).` },
        { status: 400 },
      );
    }
    if (data.title.length > 250) {
      return NextResponse.json({ error: "Title is too long (max 250 chars)." }, { status: 400 });
    }

    // Validate file before persisting
    let ext: string | undefined;
    if (upload) {
      ext = ALLOWED_MIME.get(upload.type);
      if (!ext) {
        return NextResponse.json(
          { error: "Only PDF uploads are accepted." },
          { status: 400 },
        );
      }
      if (upload.size > MAX_BYTES) {
        return NextResponse.json({ error: "PDF is larger than 5 MB." }, { status: 400 });
      }
    }

    const entry = await addAbstract({
      submittingAuthor: data.submittingAuthor.slice(0, 200),
      email: data.email.slice(0, 200),
      affiliation: data.affiliation.slice(0, 200),
      country: data.country.slice(0, 100),
      coAuthors: data.coAuthors ? data.coAuthors.slice(0, 2000) : undefined,
      title: data.title.slice(0, 250),
      abstract: data.abstract.slice(0, 5000),
      keywords: data.keywords.slice(0, 300),
      topic: data.topic,
      presentationPref: data.presentationPref,
      funding: data.funding ? data.funding.slice(0, 500) : undefined,
      comments: data.comments ? data.comments.slice(0, 2000) : undefined,
      originalWork: data.originalWork,
      shareWithReviewers: data.shareWithReviewers,
    });

    if (upload && ext) {
      const buf = Buffer.from(await upload.arrayBuffer());
      await fs.mkdir(ABSTRACTS_DIR, { recursive: true });
      const filename = `${entry.id}.${ext}`;
      await fs.writeFile(path.join(ABSTRACTS_DIR, filename), buf);
      await updateAbstract(entry.id, {
        filePath: filename,
        fileUploadedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({ ok: true, id: entry.id, fileUploaded: !!upload });
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
