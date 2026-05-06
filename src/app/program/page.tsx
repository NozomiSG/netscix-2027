import PageHero from "@/components/PageHero";
import SectionNav from "@/components/SectionNav";

export const metadata = { title: "Program | NetSciX 2027" };

const SIMPLIFIED = [
  {
    day: "Day 1 — Mon, Feb 15",
    blocks: [
      { time: "Morning", items: ["Opening", "Keynote I", "Contributed Talks I"] },
      { time: "Afternoon", items: ["Tutorial / Hypergraphs", "Poster Session A"] },
      { time: "Evening", items: ["Welcome Reception"] },
    ],
  },
  {
    day: "Day 2 — Tue, Feb 16",
    blocks: [
      { time: "Morning", items: ["Keynote II", "Contributed Talks II"] },
      { time: "Afternoon", items: ["Panel", "School: Statistical Inference", "Lightning Talks"] },
      { time: "Evening", items: ["Conference Dinner"] },
    ],
  },
  {
    day: "Day 3 — Wed, Feb 17",
    blocks: [
      { time: "Morning", items: ["Keynote III", "Industry Session"] },
      { time: "Afternoon", items: ["Contributed Talks III", "Best Paper Awards", "Closing"] },
    ],
  },
];

type Item = { time: string; title: string; speaker?: string; type: "Keynote" | "Talk" | "Panel" | "School" | "Break" | "Social" };
type DetailedDay = { day: string; items: Item[] };

const DETAILED: DetailedDay[] = [
  {
    day: "Day 1 — Mon, Feb 15",
    items: [
      { time: "08:30 – 09:30", title: "Registration & Welcome Coffee", type: "Break" },
      { time: "09:30 – 10:00", title: "Opening Remarks", speaker: "Conference Chairs", type: "Talk" },
      { time: "10:00 – 11:00", title: "Keynote I — Foundations of Network Science", speaker: "TBA", type: "Keynote" },
      { time: "11:00 – 11:30", title: "Coffee Break", type: "Break" },
      { time: "11:30 – 13:00", title: "Contributed Talks I — Structural Network Models", type: "Talk" },
      { time: "13:00 – 14:30", title: "Lunch & Networking", type: "Break" },
      { time: "14:30 – 16:30", title: "Tutorial — Hypergraphs and Higher-Order Interactions", speaker: "TBA", type: "School" },
      { time: "16:30 – 18:30", title: "Poster Session A", type: "Talk" },
      { time: "18:30 – 20:30", title: "Welcome Reception", type: "Social" },
    ],
  },
  {
    day: "Day 2 — Tue, Feb 16",
    items: [
      { time: "09:00 – 10:00", title: "Keynote II — Dynamics on Complex Networks", speaker: "TBA", type: "Keynote" },
      { time: "10:00 – 11:30", title: "Contributed Talks II — Spreading & Diffusion", type: "Talk" },
      { time: "11:30 – 12:00", title: "Coffee Break", type: "Break" },
      { time: "12:00 – 13:00", title: "Panel — Open Problems in Network Inference", type: "Panel" },
      { time: "13:00 – 14:30", title: "Lunch", type: "Break" },
      { time: "14:30 – 16:30", title: "School — Statistical Inference for Networks", speaker: "TBA", type: "School" },
      { time: "16:30 – 18:00", title: "Lightning Talks", type: "Talk" },
      { time: "19:00 – 22:00", title: "Conference Dinner", type: "Social" },
    ],
  },
  {
    day: "Day 3 — Wed, Feb 17",
    items: [
      { time: "09:00 – 10:00", title: "Keynote III — Networks in the Real World", speaker: "TBA", type: "Keynote" },
      { time: "10:00 – 11:30", title: "Industry Session — Networks at Scale", type: "Talk" },
      { time: "11:30 – 12:00", title: "Coffee Break", type: "Break" },
      { time: "12:00 – 13:30", title: "Contributed Talks III — Applications & Case Studies", type: "Talk" },
      { time: "13:30 – 15:00", title: "Lunch", type: "Break" },
      { time: "15:00 – 16:00", title: "Best Paper Awards & Closing", type: "Talk" },
      { time: "16:00 – 17:00", title: "Farewell Coffee", type: "Break" },
    ],
  },
];

const TYPE_STYLE: Record<Item["type"], string> = {
  Keynote: "bg-amber-50 text-amber-800 border-amber-200",
  Talk: "bg-blue-50 text-blue-800 border-blue-200",
  Panel: "bg-purple-50 text-purple-800 border-purple-200",
  School: "bg-emerald-50 text-emerald-800 border-emerald-200",
  Break: "bg-gray-50 text-gray-600 border-gray-200",
  Social: "bg-rose-50 text-rose-800 border-rose-200",
};

export default function ProgramPage() {
  return (
    <>
      <PageHero
        title="Program"
        subtitle="An overview of NetSciX 2027 — schools, keynotes, contributed talks, panels, and awards."
        bgImage="/images/program-bg.jpg"
      />

      <SectionNav
        items={[
          { id: "overview", label: "Overview" },
          { id: "simplified", label: "Simplified" },
          { id: "detailed", label: "Detailed" },
          { id: "awards", label: "Awards" },
        ]}
      />

      {/* Overview */}
      <section id="overview" className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="font-serif text-3xl font-bold text-ink mb-6">Program Overview</h2>
          <div className="space-y-5 text-gray-700 leading-relaxed">
            <p>
              NetSciX 2027 spans three days of keynotes, contributed talks, panels, and poster
              sessions, with parallel schools running for participants who want a deeper hands-on
              experience.
            </p>
            <p>
              The program is structured around three thematic days — Foundations on Day 1,
              Dynamics &amp; Inference on Day 2, and Applications &amp; Awards on Day 3 — with
              ample time for informal discussion and collaboration.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Stat number="3" label="Conference days" />
            <Stat number="3" label="Keynote speakers" />
            <Stat number="4" label="Schools / tutorials" />
          </div>
        </div>
      </section>

      {/* Simplified */}
      <section id="simplified" className="bg-gray-50 border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-serif text-3xl font-bold text-ink mb-8">Simplified Program</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {SIMPLIFIED.map((d) => (
              <article
                key={d.day}
                className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
              >
                <header className="bg-ink text-white px-5 py-4">
                  <h3 className="font-serif text-lg font-bold">{d.day}</h3>
                </header>
                <div className="divide-y divide-gray-100">
                  {d.blocks.map((b) => (
                    <div key={b.time} className="px-5 py-4">
                      <div className="text-xs uppercase tracking-widest text-brand">{b.time}</div>
                      <ul className="mt-2 space-y-1 text-sm text-ink">
                        {b.items.map((it) => (
                          <li key={it} className="flex gap-2">
                            <span className="text-muted">·</span>
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed */}
      <section id="detailed" className="bg-white border-t border-gray-200">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="font-serif text-3xl font-bold text-ink mb-8">Detailed Program</h2>

          <div className="space-y-12">
            {DETAILED.map((d) => (
              <div key={d.day}>
                <h3 className="font-serif text-xl font-bold text-ink mb-4 pb-2 border-b border-gray-200">
                  {d.day}
                </h3>
                <ul className="divide-y divide-gray-100">
                  {d.items.map((it, i) => (
                    <li key={i} className="py-4 flex gap-5 items-start">
                      <div className="w-32 shrink-0 font-mono text-sm text-brand pt-0.5">
                        {it.time}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-ink leading-snug">{it.title}</div>
                        {it.speaker && (
                          <div className="mt-0.5 text-sm text-muted">{it.speaker}</div>
                        )}
                      </div>
                      <span
                        className={`shrink-0 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border ${TYPE_STYLE[it.type]}`}
                      >
                        {it.type}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section id="awards" className="bg-gray-50 border-t border-gray-200">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="font-serif text-3xl font-bold text-ink mb-6">Awards</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { title: "Best Paper Award", desc: "Outstanding contribution to network science." },
              { title: "Best Student Paper", desc: "Excellence by student first authors." },
              { title: "Best Poster", desc: "Recognized at the closing ceremony." },
              { title: "Test of Time", desc: "Influential prior NetSciX work." },
            ].map((a) => (
              <div key={a.title} className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 className="font-serif text-lg font-bold text-ink">{a.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{a.desc}</p>
                <p className="mt-3 text-xs uppercase tracking-wider text-muted">TBD</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center p-5 rounded-lg border border-gray-200 bg-white">
      <div className="font-serif text-4xl font-bold text-ink">{number}</div>
      <div className="mt-1 text-sm text-muted">{label}</div>
    </div>
  );
}
