import PageHero from "@/components/PageHero";
import SectionNav from "@/components/SectionNav";
import RegistrationForm from "@/components/RegistrationForm";
import BankInfo from "@/components/BankInfo";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Registration | NetSciX 2027" };

const DEADLINES = [
  { date: "Sep 15, 2026", label: "Abstract submission opens", state: "upcoming" },
  { date: "Nov 30, 2026", label: "Abstract submission deadline", state: "upcoming" },
  { date: "Dec 20, 2026", label: "Author notification", state: "upcoming" },
  { date: "Oct 1, 2026", label: "Early-bird registration opens", state: "upcoming" },
  { date: "Dec 31, 2026", label: "Early-bird registration deadline", state: "upcoming" },
  { date: "Jan 31, 2027", label: "Standard registration deadline", state: "upcoming" },
  { date: "Feb 15 – 19, 2027", label: "Conference & schools (Hong Kong SAR)", state: "event" },
];

type FeeRow = { category: string; early: string; standard: string; onsite: string; note?: string };

const FEES: FeeRow[] = [
  { category: "Faculty / Postdoc", early: "USD 450", standard: "USD 550", onsite: "USD 650" },
  { category: "Student", early: "USD 250", standard: "USD 320", onsite: "USD 400", note: "Valid student ID required at check-in." },
  { category: "Industry", early: "USD 550", standard: "USD 650", onsite: "USD 750" },
  { category: "Schools only (1 day)", early: "USD 180", standard: "USD 220", onsite: "USD 280" },
  { category: "Accompanying person (social events)", early: "USD 120", standard: "USD 150", onsite: "USD 180" },
];

const INCLUDED = [
  "Keynote talks (3), contributed talks, panels, and poster sessions on Feb 15–17",
  "One school of your choice (full day) on Feb 14",
  "3 lunches (Feb 15, 16, 17) and 6 coffee breaks",
  "Welcome reception on Feb 14 evening",
  "Conference dinner on Feb 16 evening",
  "Conference badge, lanyard, and printed program book",
  "One-year associate membership of the NetSci Society",
  "Wi-Fi at the venue",
];

const NOT_INCLUDED = [
  "Hotel and travel",
  "Airport transfers",
  "Optional excursions",
  "Meals outside scheduled coffee breaks, lunches, and the conference dinner",
];

const FAQ = [
  {
    q: "Cancellations and refunds",
    a: "Cancellations received before Jan 15, 2027 are eligible for a 70% refund. After Jan 15 the registration is non-refundable, but it can be transferred to a colleague at no cost — just email the secretariat with the new attendee's details.",
  },
  {
    q: "Invoices and receipts",
    a: "An invoice with the conference VAT details is issued automatically once payment is received. If your institution requires a different billing entity or specific wording, fill in the \"Billing entity\" field on the form.",
  },
  {
    q: "Visa support letter",
    a: "Tick the visa-letter box on the form. Letters are issued within five working days after payment is confirmed and emailed as a signed PDF.",
  },
  {
    q: "On-site registration",
    a: "Available on Feb 15 from 08:00 at the registration desk, subject to capacity. Card payment only — no cash will be accepted.",
  },
];

export default function RegistrationPage() {
  return (
    <>
      <PageHero
        title="Registration"
        subtitle="Fees, deadlines, and the registration form for NetSciX 2027 in Hong Kong."
        bgImage="/images/conference-room.jpeg"
      />

      <SectionNav
        items={[
          { id: "deadlines", label: "Deadlines" },
          { id: "fees", label: "Fees" },
          { id: "bank", label: "Bank details" },
          { id: "register", label: "Register" },
          { id: "included", label: "What's included" },
          { id: "faq", label: "FAQ" },
        ]}
      />

      {/* Deadlines */}
      <section id="deadlines" className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <Badge variant="amber">When</Badge>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl font-bold text-ink">Deadlines</h2>
          <p className="mt-3 text-gray-600">
            All deadlines are 23:59 Anywhere on Earth (AoE). Dates may shift; the registration
            form will always reflect the current open tier.
          </p>

          <ol className="mt-10 relative border-l-2 border-amber-300 pl-6 space-y-7">
            {DEADLINES.map((d) => (
              <li key={d.label} className="relative">
                <span
                  className={
                    "absolute -left-[33px] top-1.5 w-4 h-4 rounded-full border-2 " +
                    (d.state === "event"
                      ? "bg-ink border-ink"
                      : "bg-white border-amber-500")
                  }
                />
                <div className="text-sm font-mono uppercase tracking-wide text-amber-700">
                  {d.date}
                </div>
                <div className="mt-1 font-serif text-lg text-ink">{d.label}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Fees */}
      <section
        id="fees"
        className="bg-gradient-to-br from-blue-50 via-white to-blue-50 border-t border-gray-200"
      >
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Badge variant="blue">How much</Badge>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl font-bold text-ink">Fees</h2>
          <p className="mt-3 text-gray-600 max-w-2xl">
            Prices are in US dollars and include applicable taxes. The tier is set by the date
            payment is received.
          </p>

          <div className="mt-8 hidden md:block overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-ink text-white">
                <tr>
                  <th className="px-5 py-4 font-medium text-sm">Category</th>
                  <th className="px-5 py-4 font-medium text-sm">
                    Early-bird
                    <div className="text-[11px] font-normal text-white/70">until Dec 31, 2026</div>
                  </th>
                  <th className="px-5 py-4 font-medium text-sm">
                    Standard
                    <div className="text-[11px] font-normal text-white/70">until Jan 31, 2027</div>
                  </th>
                  <th className="px-5 py-4 font-medium text-sm">
                    On-site
                    <div className="text-[11px] font-normal text-white/70">subject to capacity</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {FEES.map((row) => (
                  <tr key={row.category} className="text-sm">
                    <td className="px-5 py-4 align-top">
                      <div className="font-medium text-ink">{row.category}</div>
                      {row.note && <div className="mt-1 text-xs text-muted">{row.note}</div>}
                    </td>
                    <td className="px-5 py-4 align-top text-blue-700 font-mono">{row.early}</td>
                    <td className="px-5 py-4 align-top text-ink font-mono">{row.standard}</td>
                    <td className="px-5 py-4 align-top text-ink font-mono">{row.onsite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 md:hidden grid gap-4">
            {FEES.map((row) => (
              <article
                key={row.category}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="font-medium text-ink">{row.category}</div>
                {row.note && <div className="mt-1 text-xs text-muted">{row.note}</div>}
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
                  <Tier label="Early" value={row.early} />
                  <Tier label="Standard" value={row.standard} />
                  <Tier label="On-site" value={row.onsite} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bank details — shown before the form so participants know how to pay */}
      <section
        id="bank"
        className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-t border-gray-200"
      >
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Badge variant="emerald">Payment</Badge>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl font-bold text-ink">
            Bank details
          </h2>
          <p className="mt-3 text-gray-600">
            Use these details for bank transfers. Card payments use a Stripe-hosted link emailed
            after registration. Always include the reference below so we can match your payment.
          </p>
          <div className="mt-8">
            <BankInfo />
          </div>
        </div>
      </section>

      {/* Register form (with inline receipt upload after submission) */}
      <section id="register" className="bg-white border-t border-gray-200">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Badge variant="brand">Sign up</Badge>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl font-bold text-ink">Register</h2>

          <ol className="mt-6 text-gray-700 leading-relaxed list-decimal pl-5 space-y-1">
            <li>Authors: wait for the acceptance email. School-only attendees can register directly.</li>
            <li>Fill in the form below — the total is calculated from your category and tier.</li>
            <li>Submit. You&rsquo;ll get a registration ID and can attach your payment receipt right here.</li>
            <li>Once we confirm payment we email a receipt and your visa letter (if requested).</li>
          </ol>

          <div className="mt-10">
            <RegistrationForm />
          </div>
        </div>
      </section>

      {/* What's included */}
      <section id="included" className="bg-white border-t border-gray-200">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <Badge variant="emerald">In the fee</Badge>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl font-bold text-ink">
            What&rsquo;s included
          </h2>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-emerald-700 uppercase mb-3">Included</h3>
              <ul className="space-y-2">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 mt-1 shrink-0 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-gray-500 uppercase mb-3">Not included</h3>
              <ul className="space-y-2">
                {NOT_INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 mt-1 shrink-0 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-gray-50 border-t border-gray-200">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <Badge variant="muted">Good to know</Badge>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl font-bold text-ink">FAQ</h2>

          <div className="mt-8 divide-y divide-gray-200 border-y border-gray-200">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="cursor-pointer flex items-center justify-between gap-4 list-none">
                  <span className="font-serif text-lg text-ink">{f.q}</span>
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-muted group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="mt-3 text-gray-700 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Tier({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-blue-50 border border-blue-200 py-2">
      <div className="text-[10px] uppercase tracking-widest text-blue-700">{label}</div>
      <div className="mt-1 font-mono text-ink text-sm">{value}</div>
    </div>
  );
}
