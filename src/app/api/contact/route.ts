import { NextResponse } from "next/server";
import { addContact } from "@/lib/storage";
import { verifyTurnstile } from "@/lib/turnstile";
import { notifyContact } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, message, turnstileToken } = body ?? {};

    if (!(await verifyTurnstile(typeof turnstileToken === "string" ? turnstileToken : ""))) {
      return NextResponse.json({ error: "Bot verification failed. Please retry." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message required." }, { status: 400 });
    }

    const entry = await addContact({
      firstName: String(firstName || "").slice(0, 100),
      lastName: String(lastName || "").slice(0, 100),
      email: email.slice(0, 200),
      phone: phone ? String(phone).slice(0, 50) : undefined,
      message: message.slice(0, 5000),
    });

    await notifyContact(entry);

    return NextResponse.json({ ok: true, id: entry.id });
  } catch (err) {
    console.error("contact POST error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
