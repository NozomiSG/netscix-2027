import PageHero from "@/components/PageHero";
import SectionNav from "@/components/SectionNav";
import AbstractForm from "@/components/AbstractForm";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, FileText, Upload } from "lucide-react";

export const metadata = { title: "Submission | NetSciX 2027" };

const DEADLINES = [
  { date: "Sep 15, 2026", label: "Submission opens", state: "upcoming" },
  { date: "Nov 30, 2026", label: "Submission deadline (AoE)", state: "upcoming" },
  { date: "Dec 20, 2026", label: "Author notification", state: "upcoming" },
  { date: "Jan 10, 2027", label: "Camera-ready / final version due", state: "upcoming" },
  { date: "Feb 15 – 19, 2027", label: "Conference & schools (Hong Kong)", state: "event" },
];


const FAQ = [
  {
    q: "Can I submit more than one abstract?",
    a: "Yes. Each abstract goes through a separate submission and is reviewed independently.",
  },
  {
    q: "Do I need to register before submitting?",
    a: "No. Anyone can submit an abstract. Registration is required only after acceptance and before the early-bird deadline.",
  },
  {
    q: "What templates can I use for the optional PDF?",
    a: "Any single-column, A4 or US Letter PDF is fine. We don't enforce a specific template at submission time. Camera-ready instructions ship with acceptance emails.",
  },
  {
    q: "How will I receive the decision?",
    a: "By email to the submitting author by Dec 20, 2026. Decisions include any reviewer comments.",
  },
  {
    q: "Can I withdraw a submission?",
    a: "Yes — email the secretariat with your submission ID before the camera-ready deadline.",
  },
];

export default function AbstractsPage() {
  return (
    <>
      <PageHero
        title="Submission"
        subtitle="Share your work with the network science community at NetSciX 2027."
        bgImage="/images/program-bg.jpg"
      />

      <SectionNav
        items={[
          { id: "deadlines", label: "Deadlines" },
          { id: "guidelines", label: "Guidelines" },
          { id: "submit", label: "Submit" },
          { id: "faq", label: "FAQ" },
        ]}
      />

      {/* Deadlines */}
      <section id="deadlines" className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <Badge variant="amber">Calendar</Badge>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl font-bold text-ink">Deadlines</h2>
          <p className="mt-3 text-gray-600">
            Submission deadlines are 23:59 Anywhere on Earth (AoE). Dates may shift; the form
            stays open until the current deadline passes.
          </p>

          <ol className="mt-10 relative border-l-2 border-amber-300 pl-6 space-y-7">
            {DEADLINES.map((d) => (
              <li key={d.label} className="relative">
                <span
                  className={
                    "absolute -left-[33px] top-1.5 w-4 h-4 rounded-full border-2 " +
                    (d.state === "event" ? "bg-ink border-ink" : "bg-white border-amber-500")
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

      {/* Guidelines */}
      <section id="guidelines" className="bg-white border-t border-gray-200">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Badge variant="emerald">How to submit</Badge>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl font-bold text-ink">
            Submission guidelines
          </h2>

          <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">
            <p>
              Abstracts run 50–350 words; titles up to 250 characters. Plain text in the form is
              enough — optionally attach an extended abstract or poster as a PDF (≤ 5 MB).
            </p>
            <p>
              Submissions must be original and not under concurrent review elsewhere. List all
              co-authors and affiliations; the submitting author becomes the corresponding author.
              Pick oral, poster, or either — the committee makes the final call based on fit and
              program balance. Each submission is reviewed by at least two program committee
              members.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3 text-sm">
            <Stat icon={<FileText className="h-5 w-5" />} label="50–350 words" desc="abstract" />
            <Stat icon={<Upload className="h-5 w-5" />} label="PDF ≤ 5 MB" desc="optional" />
            <Stat icon={<CalendarDays className="h-5 w-5" />} label="Nov 30, 2026" desc="deadline (AoE)" />
          </div>
        </div>
      </section>

      {/* Submit form */}
      <section
        id="submit"
        className="bg-gradient-to-br from-blue-50 via-white to-violet-50 border-t border-gray-200"
      >
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Badge variant="blue">Submit</Badge>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl font-bold text-ink">
            Submit your abstract
          </h2>
          <p className="mt-3 text-gray-600">
            One submission per abstract. You&rsquo;ll get a submission ID right after — keep it
            for your records and for registration after acceptance.
          </p>

          <div className="mt-10">
            <AbstractForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white border-t border-gray-200">
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

function Stat({ icon, label, desc }: { icon: React.ReactNode; label: string; desc: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4">
      <div className="w-10 h-10 rounded-md bg-gray-100 text-ink flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="font-medium text-ink">{label}</div>
        <div className="text-xs text-muted">{desc}</div>
      </div>
    </div>
  );
}
