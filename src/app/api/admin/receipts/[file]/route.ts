import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { downloadReceiptFile } from "@/lib/storage";

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
  const result = await downloadReceiptFile(file);
  if (!result) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  return new NextResponse(result.buf as unknown as BodyInit, {
    headers: {
      "content-type": result.contentType,
      "content-disposition": `inline; filename="${file}"`,
    },
  });
}
