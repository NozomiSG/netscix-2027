import PageHero from "@/components/PageHero";
import SectionNav from "@/components/SectionNav";

export const metadata = { title: "Speakers | NetSciX 2027" };

type Speaker = {
  name: string;
  affiliation: string;
  talk?: string;
  bio?: string;
};

const KEYNOTES: Speaker[] = [
  {
    name: "To Be Announced",
    affiliation: "—",
    talk: "Keynote title to be announced.",
    bio: "Speaker biography will appear here once confirmed.",
  },
  {
    name: "To Be Announced",
    affiliation: "—",
    talk: "Keynote title to be announced.",
    bio: "Speaker biography will appear here once confirmed.",
  },
  {
    name: "To Be Announced",
    affiliation: "—",
    talk: "Keynote title to be announced.",
    bio: "Speaker biography will appear here once confirmed.",
  },
  {
    name: "To Be Announced",
    affiliation: "—",
    talk: "Keynote title to be announced.",
    bio: "Speaker biography will appear here once confirmed.",
  },
];

const INVITED: Speaker[] = [
  { name: "To Be Announced", affiliation: "—" },
  { name: "To Be Announced", affiliation: "—" },
  { name: "To Be Announced", affiliation: "—" },
  { name: "To Be Announced", affiliation: "—" },
  { name: "To Be Announced", affiliation: "—" },
  { name: "To Be Announced", affiliation: "—" },
];

type School = {
  title: string;
  instructors: string;
  description: string;
  level: "Introductory" | "Intermediate" | "Advanced";
};

const SCHOOLS: School[] = [
  {
    title: "Foundations of Network Science",
    instructors: "TBA",
    description:
      "A hands-on introduction to graph theory, network models, and structural measures. Suitable for participants new to the field.",
    level: "Introductory",
  },
  {
    title: "Statistical Inference for Networks",
    instructors: "TBA",
    description:
      "Methods for inferring structure and parameters from observed network data, including stochastic block models and latent variable approaches.",
    level: "Intermediate",
  },
  {
    title: "Higher-Order Networks & Hypergraphs",
    instructors: "TBA",
    description:
      "Beyond pairwise interactions: simplicial complexes, hypergraphs, and their applications to dynamics and contagion.",
    level: "Advanced",
  },
  {
    title: "Dynamical Processes on Networks",
    instructors: "TBA",
    description:
      "Spreading, synchronization, and control on networks. Tools for modeling and simulating dynamics on complex systems.",
    level: "Intermediate",
  },
];

const LEVEL_STYLE: Record<School["level"], string> = {
  Introductory: "bg-emerald-50 text-emerald-800 border-emerald-200",
  Intermediate: "bg-blue-50 text-blue-800 border-blue-200",
  Advanced: "bg-purple-50 text-purple-800 border-purple-200",
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function SpeakersPage() {
  return (
    <>
      <PageHero
        title="Speakers & Schools"
        subtitle="Featured speakers and school instructors for NetSciX 2027."
        bgImage="/images/victoria-harbour.jpg"
      />

      <SectionNav
        items={[
          { id: "keynotes", label: "Keynote Speakers" },
          { id: "invited", label: "Invited Speakers" },
          { id: "schools", label: "Schools" },
        ]}
      />

      {/* Keynote speakers */}
      <section id="keynotes" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-brand">Featured</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-ink">
              Keynote Speakers
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {KEYNOTES.map((s, i) => (
              <article
                key={i}
                className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex"
              >
                <div className="w-32 sm:w-40 shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center font-serif text-3xl font-bold text-ink/40">
                  {initials(s.name)}
                </div>
                <div className="p-5 min-w-0 flex-1">
                  <h3 className="font-serif text-lg font-bold text-ink truncate">{s.name}</h3>
                  <p className="text-sm text-muted">{s.affiliation}</p>
                  {s.talk && (
                    <p className="mt-3 text-sm font-medium text-ink leading-snug">{s.talk}</p>
                  )}
                  {s.bio && <p className="mt-2 text-sm text-gray-600 leading-relaxed">{s.bio}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Invited speakers */}
      <section id="invited" className="bg-gray-50 border-y border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-brand">Featured</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-ink">
              Invited Speakers
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {INVITED.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 flex items-center gap-4"
              >
                <div className="shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center font-serif text-lg font-bold text-ink/50">
                  {initials(s.name)}
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-ink truncate">{s.name}</div>
                  <div className="text-sm text-muted">{s.affiliation}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schools */}
      <section id="schools" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-brand">Pre-conference</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-ink">Schools</h2>
            <p className="mt-3 text-gray-600 max-w-2xl">
              Hands-on courses run alongside the conference, designed for newcomers and
              practitioners who want to deepen their toolkit.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {SCHOOLS.map((s) => (
              <article
                key={s.title}
                className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-lg font-bold text-ink">{s.title}</h3>
                  <span
                    className={`shrink-0 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border ${LEVEL_STYLE[s.level]}`}
                  >
                    {s.level}
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{s.description}</p>
                <p className="mt-4 text-xs uppercase tracking-wider text-muted">
                  Instructors:{" "}
                  <span className="text-ink normal-case tracking-normal">{s.instructors}</span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
