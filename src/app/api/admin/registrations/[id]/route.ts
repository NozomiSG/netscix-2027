import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { updateRegistration, type PaymentStatus } from "@/lib/storage";

export const runtime = "nodejs";

const VALID: PaymentStatus[] = ["pending", "paid", "refunded", "rejected"];

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  try {
    const { paymentStatus } = await req.json();
    if (!VALID.includes(paymentStatus)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }
    const updated = await updateRegistration(id, {
      paymentStatus,
      reviewedAt: new Date().toISOString(),
    });
    if (!updated) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, registration: updated });
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
}
