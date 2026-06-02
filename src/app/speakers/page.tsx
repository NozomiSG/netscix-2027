import PageHero from "@/components/PageHero";
import SectionNav from "@/components/SectionNav";
import SpeakerAvatar from "@/components/SpeakerAvatar";

export const metadata = { title: "Speakers | NetSciX 2027" };

type Speaker = {
  name: string;
  affiliation: string;
  website?: string;
  photo?: string;
  bio?: string[];
};

const KEYNOTES: Speaker[] = [
  {
    name: "Guanrong Chen",
    affiliation: "City University of Hong Kong",
    website: "https://www.ee.cityu.edu.hk/~gchen/",
    photo: "/images/speakers/guanrong-chen.jpg",
    bio: [
      "Professor Guanrong (Ron) Chen received the M.Sc. degree in computational mathematics from Sun Yat-sen (Zhongshan) University, China in 1981, and the Ph.D. degree in applied mathematics from Texas A&M University, USA in 1987. He has been a chair professor (now, \"Shun Hing Education and Charity Fund Chair Professorship in Engineering\") and the founding director of the Centre for Complexity and Complex Networks at City University of Hong Kong since year 2000, prior to that he was a tenured full professor at the University of Houston, Texas, USA.",
      "Prof. Chen was elected Member of the Academy of Europe (Academia Europaea) in 2014, Member of the European Academy of Engineering and Fellow of The World Academy of Sciences in 2015. In the past, he was elected IEEE Fellow in 1997 and became Life Fellow since 2019. He was conferred Honorary Doctorates by Saint Petersburg State University, Russia in 2011 and by University of Le Havre, Normandy, France in 2014. He is a Highly Cited Researcher in Engineering in the past decade, was the 2011 Euler Gold Medallist named by the Euler Foundation of Russia, and recipient of 2008, 2012 and 2016 Chinese State Natural Science Awards as well as 11 best journal paper awards. He is Honorary Professor at different ranks in some 30 universities worldwide.",
      "Prof. Chen's main research pursuit is in nonlinear systems control and dynamics, as well as complex networks. Currently, he is the Editor-in-Chief of the International Journal of Bifurcation and Chaos.",
    ],
  },
  {
    name: "Marta González",
    affiliation: "University of California, Berkeley, USA",
    website: "https://ced.berkeley.edu/people/marta-gonzalez",
    photo: "/images/speakers/marta-gonzalez.jpg",
    bio: [
      "Marta Gonzalez is Professor of City & Regional Planning and Environmental Engineering at UC Berkeley. She is Director of HuMNet Lab, where she and her colleagues develop numerical models and computational tools to better characterize and understand human interactions in the built and natural environments. Gonzalez is also a Physics Research faculty in the Energy Technology Area (ETA) at the Lawrence Berkeley National Laboratory (Berkeley Lab).",
      "Gonzalez's research focuses on urban sciences, with a focus on the intersections of people with the built and the natural environment and their social networks. Her ultimate goal is to design urban solutions and enable caring development in the use of new technologies. Gonzalez has developed new tools that impact transportation research and discovered novel approaches to model human mobility and the adoption of energy technologies.",
      "She is a recipient of the prestigious Joseph M Sussman Prize for Frontiers in Built Environment best article award in 2021, the UN Foundation award in support of her research studying the consumption patterns of women in the developing world in 2016, and the Bill and Melinda Gates Foundation award to study access to financial services in the developing world in 2016. In 2023, she was named fellow of the Network Science Society for her seminal contributions to our understanding of human mobility and transportation networks, and for applying network modeling to solve societal problems in urban systems, and in 2024 she received the Lagrange-CRT Foundation Prize for her scientific research in the field of complexity sciences, its applications and dissemination.",
    ],
  },
  {
    name: "Mario di Bernardo",
    affiliation: "University of Naples Federico II, Italy",
    website: "https://sites.google.com/site/dibernardogroup/home",
    photo: "/images/speakers/mario-di-bernardo.jpg",
    bio: [
      "Mario di Bernardo (SMIEEE '06, FIEEE 2012) is Professor of Automatic Control at the University of Naples Federico II, Italy and Visiting Professor of Nonlinear Systems and Control at the University of Bristol, U.K. He currently serves as Rector's Delegate for Internationalization at the University of Naples Federico II and coordinates the research area and PhD program on Modeling and Engineering Risk and Complexity at the Scuola Superiore Meridionale, a new School of Advanced Studies established by the Italian Government in 2018 in Naples.",
      "He is Vice President for Technical Activities of the IEEE Control Systems Society for the term 2025–2026, having previously served on its Board of Governors (2015–2021, 2023–2025). On 28th February 2007, he was awarded the title of Cavaliere of the Order of Merit of the Italian Republic by the President of Italy in recognition of his scientific achievements. He was elevated to the grade of Fellow of the IEEE in January 2012 for his contributions to the analysis, control, and applications of nonlinear systems and complex networks.",
      "In 2009, he was elected President of the Italian Society for Chaos and Complexity serving two consecutive terms from 2010 to 2013 and from 2014 to 2017. In addition, he was elected to the Board of Governors of the IEEE Circuits and Systems Society in 2006 and again in 2009. From 2011 to 2014, he held the position of Vice President for Financial Activities of the IEEE Circuits and Systems Society.",
      "Prof. di Bernardo's research interests span the analysis, synchronization, and control of complex network systems, piecewise-smooth dynamical systems, nonlinear dynamics, and nonlinear control, with applications in both engineering and computational biology. He has authored or co-authored more than 250 international scientific publications, including over 150 papers in peer-reviewed scientific journals, a research monograph, and two edited books. As of April 2026, his publications have received more than 14,000 citations with an h-index of 55, according to SCOPUS. In 2017, he was the recipient of the prestigious IEEE George N. Saridis Best Transactions Paper Award for Outstanding Research. He also served as a Distinguished Lecturer of the IEEE Circuits and Systems Society for the 2016–2017 term. He currently coordinates the EU Marie Curie Training Network \"BeyondTheEdge\" (2024–2027) and is a partner in the EU Horizon Europe project SHARESPACE.",
      "Prof. di Bernardo has held numerous editorial roles, serving on the boards of several leading international scientific journals and conferences. From 2017 to 2022, he was Senior Editor of the IEEE Transactions on Control of Network Systems and an Associate Editor of the IEEE Control Systems Letters. Previously, he was Deputy Editor-in-Chief of the IEEE Transactions on Circuits and Systems: Regular Papers from 1st January 2014 to 31st December 2015. He also served as Associate Editor of Nonlinear Analysis: Hybrid Systems, the IEEE Transactions on Circuits and Systems I: Regular Papers (1999–2002, 2008–2010), and the IEEE Transactions on Circuits and Systems II: Brief Papers (2003–2008). In addition, he is a member of the Conference Editorial Board of both the IEEE Control Systems Society and the European Control Association (EUCA).",
      "Prof. di Bernardo is regularly invited as a plenary speaker at major conferences, including the SICE Festival Conference 2026, ICAIS & ISAS 2026, Chinese Control Conference 2025, and NetSci 2024. He serves as Chair of the ECC 2026 Best Paper Award Committee, and previously served as Program Co-Chair of the European Control Conference in 2019 and Publicity Chair of the IEEE ISCAS Conference in 2018. His research has been supported by funding from several prominent agencies and industries, including the European Union, UK research councils, and the Italian Ministry of Research and University.",
    ],
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
          <div className="space-y-12">
            {KEYNOTES.map((s, i) => (
              <article
                key={i}
                className="grid gap-6 md:grid-cols-[210px_1fr] md:gap-8 border-b border-gray-200 pb-12 last:border-0 last:pb-0"
              >
                <div className="flex flex-col items-start gap-3">
                  <SpeakerAvatar
                    src={s.photo}
                    name={s.name}
                    className="w-40 md:w-full aspect-square rounded-xl"
                    textClassName="text-4xl"
                  />
                  <div>
                    <h3 className="font-serif text-xl font-bold text-ink">{s.name}</h3>
                    <p className="text-sm text-muted">{s.affiliation}</p>
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
                <div className="space-y-4 text-[15px] leading-relaxed text-gray-700">
                  {s.bio ? (
                    s.bio.map((para, j) => <p key={j}>{para}</p>)
                  ) : (
                    <p className="text-muted italic">Full bio coming soon.</p>
                  )}
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
