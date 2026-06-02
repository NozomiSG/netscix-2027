import PageHero from "@/components/PageHero";
import SectionNav from "@/components/SectionNav";
import SpeakerAvatar from "@/components/SpeakerAvatar";

export const metadata = { title: "Speakers | NetSciX 2027" };

type Speaker = {
  name: string;
  affiliation: string;
  website?: string;
  photo?: string;
};

const KEYNOTES: Speaker[] = [
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
    name: "Mario di Bernardo",
    affiliation: "University of Naples Federico II, Italy",
    website: "https://sites.google.com/site/dibernardogroup/home",
    photo: "/images/speakers/mario-di-bernardo.jpg",
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
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-brand">Featured</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-ink">
              Keynote Speakers
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {KEYNOTES.map((s, i) => (
              <article
                key={i}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col items-center text-center transition hover:shadow-md"
              >
                <SpeakerAvatar
                  src={s.photo}
                  name={s.name}
                  className="w-28 h-28 rounded-full"
                  textClassName="text-2xl"
                />
                <h3 className="mt-4 font-serif text-base font-bold text-ink">{s.name}</h3>
                <p className="mt-1 text-sm text-muted leading-snug">{s.affiliation}</p>
                {s.website && (
                  <a
                    href={s.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 text-sm font-medium text-brand hover:underline"
                  >
                    Website →
                  </a>
                )}
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
          <div className="rounded-lg border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
            <p className="font-serif text-2xl text-ink">TBA</p>
            <p className="mt-2 text-sm text-muted">
              Invited speakers will be announced in due course.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
