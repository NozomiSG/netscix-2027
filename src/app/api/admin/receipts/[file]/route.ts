import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { RECEIPTS_DIR } from "@/lib/storage";

export const runtime = "nodejs";

const MIME: Record<string, string> = {
  pdf: "application/pdf",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ file: string }> },
) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { file } = await ctx.params;
  // Path traversal guard
  if (!/^[A-Za-z0-9_.-]+$/.test(file)) {
    return NextResponse.json({ error: "Bad filename." }, { status: 400 });
  }
  const ext = file.split(".").pop()?.toLowerCase() || "";
  const fullPath = path.join(RECEIPTS_DIR, file);
  try {
    const buf = await fs.readFile(fullPath);
    return new NextResponse(buf, {
      headers: {
        "content-type": MIME[ext] || "application/octet-stream",
        "content-disposition": `inline; filename="${file}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
}
