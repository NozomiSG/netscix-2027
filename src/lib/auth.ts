import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "netscix_admin";
const MAX_AGE_SEC = 60 * 60 * 24; // 24h

function getPassword(): string {
  const p = process.env.ADMIN_PASSWORD;
  if (!p) throw new Error("Missing ADMIN_PASSWORD env var.");
  return p;
}

function getSecret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error("Missing SESSION_SECRET env var.");
  return s;
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

function expectedToken() {
  return sign("admin:ok");
}

export function verifyPassword(input: string): boolean {
  if (typeof input !== "string" || input.length === 0) return false;
  const password = getPassword();
  const a = Buffer.from(input);
  const b = Buffer.from(password);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function setSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, expectedToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SEC,
  });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  const v = store.get(COOKIE_NAME)?.value;
  if (!v) return false;
  const expected = expectedToken();
  if (v.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(v), Buffer.from(expected));
}
