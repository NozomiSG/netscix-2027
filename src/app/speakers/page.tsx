import PageHero from "@/components/PageHero";
import SectionNav from "@/components/SectionNav";
import SpeakerAvatar from "@/components/SpeakerAvatar";

export const metadata = { title: "Speakers | NetSciX 2027" };

type Speaker = {
  name: string;
  affiliation: string;
  talk?: string;
  bio?: string;
  website?: string;
  photo?: string;
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
  {
    name: "Guanrong Chen",
    affiliation: "City University of Hong Kong",
    website: "https://www.ee.cityu.edu.hk/~gchen/",
    photo: "/images/speakers/guanrong-chen.jpg",
  },
  {
    name: "Marta González",
    affiliation: "University of California, Berkeley, USA",
    website: "https://ced.berkeley.edu/people/marta-gonzalez",
    photo: "/images/speakers/marta-gonzalez.jpg",
  },
  {
    name: "Christopher Moore",
    affiliation: "Santa Fe Institute, USA",
    website: "https://sites.santafe.edu/~moore/",
    photo: "/images/speakers/christopher-moore.jpg",
  },
  {
    name: "Yizhou Sun",
    affiliation: "University of California, Los Angeles",
    website: "https://web.cs.ucla.edu/~yzsun/",
    photo: "/images/speakers/yizhou-sun.jpg",
  },
  {
    name: "Mario di Bernardo",
    affiliation: "University of Naples Federico II, Italy",
    website: "https://sites.google.com/site/dibernardogroup/home",
    photo: "/images/speakers/mario-di-bernardo.jpg",
  },
];

export default function SpeakersPage() {
  return (
    <>
      <PageHero
        title="Speakers"
        subtitle="Keynote and invited speakers for NetSciX 2027."
        bgImage="/images/victoria-harbour.jpg"
      />

      <SectionNav
        items={[
          { id: "keynotes", label: "Keynote Speakers" },
          { id: "invited", label: "Invited Speakers" },
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
                <SpeakerAvatar
                  src={s.photo}
                  name={s.name}
                  className="w-32 sm:w-40 shrink-0"
                  textClassName="text-3xl"
                />
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
                <SpeakerAvatar
                  src={s.photo}
                  name={s.name}
                  className="shrink-0 w-14 h-14 rounded-full"
                  textClassName="text-lg"
                />
                <div className="min-w-0">
                  <div className="font-medium text-ink">{s.name}</div>
                  <div className="text-sm text-muted">{s.affiliation}</div>
                  {s.website && (
                    <a
                      href={s.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-sm font-medium text-brand hover:underline"
                    >
                      Website →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
