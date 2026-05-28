import type {
  AbstractSubmission,
  ContactSubmission,
  RegistrationSubmission,
} from "./storage";

const API_KEY = process.env.RESEND_API_KEY;
const FROM = process.env.EMAIL_FROM;
const ADMIN_TO = process.env.ADMIN_NOTIFY_EMAIL;
const SEND_URL = "https://api.resend.com/emails";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function nl2br(s: string): string {
  return esc(s).replace(/\n/g, "<br>");
}

// No-ops when Resend isn't configured, and never throws — email must not
// break a submission that already persisted.
async function send(to: string, subject: string, html: string): Promise<void> {
  if (!API_KEY || !FROM || !to) return;
  try {
    const res = await fetch(SEND_URL, {
      method: "POST",
      headers: { authorization: `Bearer ${API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({ from: FROM, to, subject, html }),
    });
    if (!res.ok) {
      console.error("resend send failed:", res.status, await res.text());
    }
  } catch (err) {
    console.error("resend send error:", err);
  }
}

const SIGNATURE = "<p style=\"color:#666;font-size:13px\">— NetSciX 2027 Secretariat</p>";

export async function notifyContact(c: ContactSubmission): Promise<void> {
  const name = [c.firstName, c.lastName].filter(Boolean).join(" ") || "there";
  await send(
    c.email,
    "We received your message — NetSciX 2027",
    `<p>Hi ${esc(name)},</p>
     <p>Thanks for contacting the NetSciX 2027 Secretariat. We have received your message and will get back to you soon.</p>
     ${SIGNATURE}`,
  );
  if (ADMIN_TO) {
    await send(
      ADMIN_TO,
      `New contact message from ${name}`,
      `<p><b>${esc(name)}</b> &lt;${esc(c.email)}&gt;${c.phone ? " · " + esc(c.phone) : ""}</p>
       <p>${nl2br(c.message)}</p>
       <p style="color:#999;font-size:12px">id: ${esc(c.id)}</p>`,
    );
  }
}

export async function notifyRegistration(r: RegistrationSubmission): Promise<void> {
  const name = [r.firstName, r.lastName].filter(Boolean).join(" ") || "there";
  await send(
    r.email,
    "Registration received — NetSciX 2027",
    `<p>Hi ${esc(name)},</p>
     <p>Your registration for NetSciX 2027 has been received. Reference: <b>${esc(r.id)}</b>.</p>
     <p>Total due: <b>USD ${r.fee.toLocaleString()}</b> (${esc(r.category)} · ${esc(r.tier)}).</p>
     <p>${r.receiptPath ? "We received your payment receipt and it is awaiting review." : "We will email payment instructions shortly."}</p>
     ${SIGNATURE}`,
  );
  if (ADMIN_TO) {
    await send(
      ADMIN_TO,
      `New registration: ${name} (USD ${r.fee})`,
      `<p><b>${esc(name)}</b> &lt;${esc(r.email)}&gt;</p>
       <p>${esc(r.affiliation)} · ${esc(r.country)}</p>
       <p>${esc(r.category)} · ${esc(r.tier)} · USD ${r.fee.toLocaleString()}${r.accompanying ? " · +" + r.accompanying + " accompanying" : ""}</p>
       <p>Receipt: ${r.receiptPath ? "attached" : "not yet"}</p>
       <p style="color:#999;font-size:12px">id: ${esc(r.id)}</p>`,
    );
  }
}

export async function notifyAbstract(a: AbstractSubmission): Promise<void> {
  await send(
    a.email,
    "Abstract received — NetSciX 2027",
    `<p>Hi ${esc(a.submittingAuthor)},</p>
     <p>Your abstract has been received. Submission ID: <b>${esc(a.id)}</b>. Keep this for your records.</p>
     <p>Title: ${esc(a.title)}</p>
     <p>We will email the program committee's decision by the notification deadline.</p>
     ${SIGNATURE}`,
  );
  if (ADMIN_TO) {
    await send(
      ADMIN_TO,
      `New abstract: ${a.title}`,
      `<p><b>${esc(a.submittingAuthor)}</b> &lt;${esc(a.email)}&gt;</p>
       <p>${esc(a.affiliation)} · ${esc(a.country)}</p>
       <p>Topic: ${esc(a.topic)} · Pref: ${esc(a.presentationPref)}</p>
       <p>PDF: ${a.filePath ? "attached" : "none"}</p>
       <p style="color:#999;font-size:12px">id: ${esc(a.id)}</p>`,
    );
  }
}
