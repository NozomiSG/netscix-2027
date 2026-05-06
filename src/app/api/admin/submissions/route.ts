import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { readAll } from "@/lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await readAll();
  return NextResponse.json(data);
}
