import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { ABSTRACTS_DIR } from "@/lib/storage";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ file: string }> },
) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { file } = await ctx.params;
  if (!/^[A-Za-z0-9_.-]+$/.test(file)) {
    return NextResponse.json({ error: "Bad filename." }, { status: 400 });
  }
  try {
    const buf = await fs.readFile(path.join(ABSTRACTS_DIR, file));
    return new NextResponse(buf, {
      headers: {
        "content-type": "application/pdf",
        "content-disposition": `inline; filename="${file}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
}
