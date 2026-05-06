import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { updateAbstract, type AbstractStatus } from "@/lib/storage";

export const runtime = "nodejs";

const VALID: AbstractStatus[] = [
  "submitted",
  "under-review",
  "accepted",
  "rejected",
  "withdrawn",
];

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  try {
    const { status } = await req.json();
    if (!VALID.includes(status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }
    const updated = await updateAbstract(id, {
      status,
      reviewedAt: new Date().toISOString(),
    });
    if (!updated) return NextResponse.json({ error: "Not found." }, { status: 404 });
    return NextResponse.json({ ok: true, abstract: updated });
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
}
