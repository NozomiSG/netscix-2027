import PageHero from "@/components/PageHero";
import SectionNav from "@/components/SectionNav";

export const metadata = { title: "Key Dates | NetSciX 2027" };

const MILESTONES = [
  { date: "Sep 15, 2026", label: "Abstract submission opens" },
  { date: "Nov 30, 2026", label: "Submission deadline" },
  { date: "Dec 20, 2026", label: "Author notification" },
  { date: "Jan 10, 2027", label: "Camera-ready due" },
  { date: "Oct 1, 2026", label: "Early-bird registration opens" },
  { date: "Jan 20, 2027", label: "Standard registration deadline" },
  { date: "Feb 15 – 19, 2027", label: "Conference & schools (Hong Kong SAR)" },
];

type Slot = { time: string; title: string; speaker?: string; tag?: "Keynote" | "Talk" | "Break" | "Panel" | "School" };
type Day = { date: string; theme: string; slots: Slot[] };

const SCHEDULE: Day[] = [
  {
    date: "Mon, Feb 15",
    theme: "Day 1 — Opening & Foundations",
    slots: [
      { time: "08:30", title: "Registration & Welcome Coffee", tag: "Break" },
      { time: "09:30", title: "Opening Remarks", speaker: "Conference Chairs", tag: "Talk" },
      { time: "10:00", title: "Keynote — Foundations of Network Science", speaker: "TBA", tag: "Keynote" },
      { time: "11:00", title: "Coffee Break", tag: "Break" },
      { time: "11:30", title: "Contributed Talks I — Structural Network Models", tag: "Talk" },
      { time: "13:00", title: "Lunch & Networking", tag: "Break" },
      { time: "14:30", title: "Tutorial — Hypergraphs and Higher-Order Interactions", tag: "School" },
      { time: "16:30", title: "Poster Session A", tag: "Talk" },
      { time: "18:30", title: "Welcome Reception", tag: "Break" },
    ],
  },
  {
    date: "Tue, Feb 16",
    theme: "Day 2 — Dynamics & Inference",
    slots: [
      { time: "09:00", title: "Keynote — Dynamics on Complex Networks", speaker: "TBA", tag: "Keynote" },
      { time: "10:00", title: "Contributed Talks II — Spreading & Diffusion", tag: "Talk" },
      { time: "11:30", title: "Coffee Break", tag: "Break" },
      { time: "12:00", title: "Panel — Open Problems in Network Inference", tag: "Panel" },
      { time: "13:00", title: "Lunch", tag: "Break" },
      { time: "14:30", title: "School — Statistical Inference for Networks", tag: "School" },
      { time: "16:30", title: "Lightning Talks", tag: "Talk" },
      { time: "19:00", title: "Conference Dinner", tag: "Break" },
    ],
  },
  {
    date: "Wed, Feb 17",
    theme: "Day 3 — Applications & Awards",
    slots: [
      { time: "09:00", title: "Keynote — Networks in the Real World", speaker: "TBA", tag: "Keynote" },
      { time: "10:00", title: "Industry Session — Networks at Scale", tag: "Talk" },
      { time: "11:30", title: "Coffee Break", tag: "Break" },
      { time: "12:00", title: "Contributed Talks III — Applications & Case Studies", tag: "Talk" },
      { time: "13:30", title: "Lunch", tag: "Break" },
      { time: "15:00", title: "Best Paper Awards & Closing", tag: "Talk" },
      { time: "16:00", title: "Farewell Coffee", tag: "Break" },
    ],
  },
];

const TAG_STYLE: Record<NonNullable<Slot["tag"]>, string> = {
  Keynote: "bg-amber-50 text-amber-800 border-amber-200",
  Talk: "bg-blue-50 text-blue-800 border-blue-200",
  Break: "bg-gray-50 text-gray-600 border-gray-200",
  Panel: "bg-purple-50 text-purple-800 border-purple-200",
  School: "bg-emerald-50 text-emerald-800 border-emerald-200",
};

export default function KeyDatesPage() {
  return (
    <>
      <PageHero
        title="Key Dates"
        subtitle="Submission deadlines, registration milestones, and the day-by-day program."
        bgImage="/images/program-bg.jpg"
      />

      <SectionNav
        items={[
          { id: "milestones", label: "Important Dates" },
          { id: "schedule", label: "Schedule" },
        ]}
      />

      {/* Milestones timeline */}
      <section id="milestones" className="bg-white">
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

      {/* Demo schedule */}
      <section id="schedule" className="bg-gray-50 border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-serif text-3xl font-bold text-ink mb-8">Schedule (Demo)</h2>

          <div className="grid gap-8 lg:grid-cols-3">
            {SCHEDULE.map((day) => (
              <article
                key={day.date}
                className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
              >
                <header className="bg-ink text-white px-5 py-4">
                  <div className="text-xs uppercase tracking-widest text-white/70">{day.date}</div>
                  <h3 className="mt-1 font-serif text-lg font-bold">{day.theme}</h3>
                </header>
                <ul className="divide-y divide-gray-100">
                  {day.slots.map((s, i) => (
                    <li key={i} className="px-5 py-4 flex gap-4">
                      <div className="w-14 shrink-0 font-mono text-sm text-brand pt-0.5">{s.time}</div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm text-ink leading-snug">{s.title}</div>
                        {s.speaker && (
                          <div className="mt-0.5 text-xs text-muted">{s.speaker}</div>
                        )}
                      </div>
                      {s.tag && (
                        <span
                          className={`shrink-0 self-start text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border ${TAG_STYLE[s.tag]}`}
                        >
                          {s.tag}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="mt-8 text-sm text-muted text-center">
            Demo schedule for layout preview. The final program will be published closer to the conference.
          </p>
        </div>
      </section>
    </>
  );
}
