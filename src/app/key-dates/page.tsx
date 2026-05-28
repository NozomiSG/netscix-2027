import PageHero from "@/components/PageHero";

export const metadata = { title: "Key Dates | NetSciX 2027" };

const MILESTONES = [
  { date: "Sep 15, 2026", label: "Abstract submission opens" },
  { date: "Nov 30, 2026", label: "Submission deadline" },
  { date: "Dec 20, 2026", label: "Author notification" },
  { date: "Jan 10, 2027", label: "Camera-ready due" },
  { date: "Oct 1, 2026", label: "Early-bird registration opens" },
  { date: "Jan 20, 2027", label: "Standard registration deadline" },
  { date: "Jan 24 – 27, 2027", label: "Conference & schools (Hong Kong SAR)" },
];

export default function KeyDatesPage() {
  return (
    <>
      <PageHero
        title="Key Dates"
        subtitle="Submission deadlines and registration milestones for NetSciX 2027."
        bgImage="/images/program-bg.jpg"
      />

      {/* Milestones timeline */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="font-serif text-3xl font-bold text-ink mb-8">Important Dates</h2>
          <ol className="relative border-l-2 border-gray-200 pl-6 space-y-8">
            {MILESTONES.map((m) => (
              <li key={m.label} className="relative">
                <span className="absolute -left-[33px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-ink" />
                <div className="text-sm font-mono uppercase tracking-wide text-brand">{m.date}</div>
                <div className="mt-1 font-serif text-lg text-ink">{m.label}</div>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-sm text-muted">
            Dates are tentative and may be updated. All deadlines are 23:59 Anywhere on Earth (AoE).
          </p>
        </div>
      </section>
    </>
  );
}
