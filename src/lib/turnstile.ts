const SECRET = process.env.TURNSTILE_SECRET_KEY;
const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

// Returns true when the token is valid, or when Turnstile is not configured
// (so the site keeps working before keys are set). Fails closed on a bad token.
export async function verifyTurnstile(token: string | null | undefined): Promise<boolean> {
  if (!SECRET) return true;
  if (!token) return false;
  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: SECRET, response: token }),
    });
    const data = (await res.json()) as { success?: boolean };
    return !!data.success;
  } catch (err) {
    console.error("turnstile verify error:", err);
    return false;
  }
}
