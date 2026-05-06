import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionNav from "@/components/SectionNav";

export const metadata = { title: "About | NetSciX 2027" };

type Member = { name: string; affiliation?: string };
type Group = { title: string; members: Member[] };

const COMMITTEE: Group[] = [
  {
    title: "Conference Chair",
    members: [{ name: "Jie Sun", affiliation: "HUAWEI Hong Kong Research Center" }],
  },
  {
    title: "Open-source Software Chair",
    members: [{ name: "Juntao Wang", affiliation: "HUAWEI Hong Kong Research Center" }],
  },
  {
    title: "Colloquium Chair",
    members: [{ name: "Carlo Vittorio Cannistraci" }],
  },
  {
    title: "Industry Chair",
    members: [{ name: "Daniel Ebler", affiliation: "HUAWEI Hong Kong Research Center" }],
  },
  {
    title: "Advisory Board",
    members: [
      { name: "Adilson Motter", affiliation: "Northwestern University" },
      { name: "Guangrong Chen", affiliation: "City University of Hong Kong" },
      { name: "Renaud Lambiotte", affiliation: "University of Oxford" },
    ],
  },
];

const HOTELS = [
  {
    name: "Sheraton Hong Kong Hotel & Towers (venue)",
    distance: "On-site",
    note: "The conference venue. Special block rates for attendees will be announced.",
  },
  {
    name: "The Peninsula Hong Kong",
    distance: "~5 min walk",
    note: "Iconic luxury hotel directly across Salisbury Road from the venue.",
  },
  {
    name: "Hyatt Regency Tsim Sha Tsui",
    distance: "~8 min walk",
    note: "Modern mid-to-upscale hotel above K11 MUSEA on Hanoi Road.",
  },
  {
    name: "Holiday Inn Golden Mile",
    distance: "~5 min walk",
    note: "Reliable mid-range option on Nathan Road, close to MTR Exit B2.",
  },
  {
    name: "The Royal Pacific Hotel & Towers",
    distance: "~12 min walk",
    note: "Value option near China Hong Kong City and the Star Ferry pier.",
  },
  {
    name: "BP International",
    distance: "~10 min walk",
    note: "Budget-friendly stay opposite Kowloon Park, with MTR access at Jordan.",
  },
];

const SPONSOR_TIERS = [
  { tier: "Diamond Partners", count: 3 },
  { tier: "Gold Partners", count: 4 },
  { tier: "Focus Session Partners", count: 4 },
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About NetSciX 2027"
        subtitle="Venue, accommodation, the people organizing the event, and the partners that make it possible."
        bgImage="/images/general-info-bg.jpg"
      />

      <SectionNav
        items={[
          { id: "venue", label: "Venue" },
          { id: "accommodation", label: "Accommodation" },
          { id: "committee", label: "Organizing Committee" },
          { id: "sponsors", label: "Sponsors" },
        ]}
      />

      {/* Venue */}
      <section id="venue" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-2 items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand">Where</p>
              <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-ink">Venue</h2>
              <p className="mt-4 text-gray-700 leading-relaxed">
                NetSciX 2027 will be hosted at the{" "}
                <a
                  href="https://www.marriott.com/en-us/hotels/hkgis-sheraton-hong-kong-hotel-and-towers/overview/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline"
                >
                  Sheraton Hong Kong Hotel &amp; Towers
                </a>{" "}
                in Tsim Sha Tsui, Kowloon — a landmark hotel at the southern tip of Nathan Road,
                steps from Victoria Harbour, the Star Ferry, and the MTR network.
              </p>

              <dl className="mt-8 grid gap-3 text-sm">
                <Row k="Address" v="20 Nathan Road, Tsim Sha Tsui, Kowloon, Hong Kong" />
                <Row k="Nearest MTR" v="Tsim Sha Tsui Station (Tsuen Wan Line) — Exit E, ~2 min walk" />
                <Row
                  k="From HKIA"
                  v="≈ 35 min by taxi (HK$280–320) · Airport Express to Kowloon + 5 min taxi · A21 bus direct"
                />
                <Row
                  k="Star Ferry"
                  v="≈ 5 min walk to TST Pier — scenic crossing to Central in 10 min"
                />
                <Row
                  k="Climate (Feb)"
                  v="Mild — average 18 °C day / 14 °C night. Light layers recommended."
                />
                <Row k="Language" v="English — official language of the congress." />
                <Row k="Currency" v="Hong Kong Dollar (HKD). Major cards widely accepted." />
                <Row k="Power" v="220 V, 50 Hz. UK-style three-pin plugs." />
                <Row k="Time Zone" v="HKT (UTC+8)" />
              </dl>
            </div>

            <div className="space-y-4 md:mt-20">
              <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <Image
                  src="/images/hotel-sheraton.jpeg"
                  alt="Sheraton Hong Kong Hotel & Towers — venue exterior"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Getting here */}
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="font-serif text-lg font-bold text-ink mb-3">Getting Here</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li>
                    <span className="font-medium text-ink">By MTR.</span> Take the Tsuen Wan Line
                    to Tsim Sha Tsui Station. Use Exit E and walk south on Nathan Road for ~2
                    minutes.
                  </li>
                  <li>
                    <span className="font-medium text-ink">From HKIA — Airport Express.</span>{" "}
                    AEL to Kowloon Station (~22 min), then a 5-minute taxi or one MTR stop on
                    the Tung Chung / Tsuen Wan lines via interchange.
                  </li>
                  <li>
                    <span className="font-medium text-ink">From HKIA — A21 Bus.</span> Cityflyer
                    A21 stops directly in front of the hotel on Nathan Road (~60 min, HK$33).
                  </li>
                  <li>
                    <span className="font-medium text-ink">By taxi from HKIA.</span> ~35 minutes,
                    fare around HK$280–320 incl. tunnel toll.
                  </li>
                  <li>
                    <span className="font-medium text-ink">Star Ferry.</span> A 5-minute walk to
                    the TST Pier; the harbour crossing to Central / Wan Chai is HK$5.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Full-width map */}
          <div className="mt-12">
            <div className="h-[360px] md:h-[420px] w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm">
              <iframe
                title="Sheraton Hong Kong Hotel & Towers map"
                src="https://maps.google.com/maps?q=Sheraton+Hong+Kong+Hotel+%26+Towers,+20+Nathan+Road,+Tsim+Sha+Tsui&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href="https://maps.google.com/?q=Sheraton+Hong+Kong+Hotel+%26+Towers,+20+Nathan+Road,+Tsim+Sha+Tsui"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
            >
              Open in Google Maps
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Accommodation */}
      <section id="accommodation" className="bg-gray-50 border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs uppercase tracking-[0.3em] text-brand">Where to stay</p>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-ink">
            Accommodation
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl">
            A short list of recommended hotels close to the venue. Block-booking details and
            partner rates will be published as the event approaches.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {HOTELS.map((h) => (
              <article
                key={h.name}
                className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                <h3 className="font-serif text-lg font-bold text-ink">{h.name}</h3>
                <p className="mt-1 text-sm text-brand font-mono">{h.distance}</p>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{h.note}</p>
              </article>
            ))}
          </div>

          <p className="mt-8 text-sm text-muted">
            Demo list. Final recommendations and booking codes will be posted closer to the event.
          </p>
        </div>
      </section>

      {/* Organizing Committee */}
      <section id="committee" className="bg-white border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs uppercase tracking-[0.3em] text-brand">Who</p>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-ink">
            Organizing Committee
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl">
            Our organizers are excited to make NetSciX 2027 an unforgettable event for our
            community.
          </p>

          <div className="mt-10 space-y-12">
            {COMMITTEE.map((g) => (
              <section key={g.title}>
                <div className="flex items-baseline gap-4 mb-5">
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-ink">{g.title}</h3>
                  <div className="flex-1 border-t border-gray-200" />
                  <span className="text-xs uppercase tracking-widest text-muted">
                    {g.members.length} {g.members.length === 1 ? "member" : "members"}
                  </span>
                </div>
                <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {g.members.map((m) => (
                    <li
                      key={m.name}
                      className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 bg-white shadow-sm"
                    >
                      <div className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center font-serif text-base font-bold text-ink">
                        {initials(m.name)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-ink truncate">{m.name}</div>
                        {m.affiliation && (
                          <div className="text-sm text-muted">{m.affiliation}</div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section id="sponsors" className="bg-gray-50 border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs uppercase tracking-[0.3em] text-brand">Support</p>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-ink">Sponsors</h2>
          <p className="mt-3 text-gray-600 max-w-2xl">
            We gratefully acknowledge the support of our partners. This event would not be
            possible without them.
          </p>

          <div className="mt-10 space-y-10">
            {SPONSOR_TIERS.map((t) => (
              <section key={t.tier}>
                <h3 className="font-serif text-xl font-bold text-ink mb-4">{t.tier}</h3>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                  {Array.from({ length: t.count }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-[3/2] rounded-lg border border-dashed border-gray-300 bg-white flex items-center justify-center text-muted text-sm"
                    >
                      Logo TBA
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-10 text-sm text-muted text-center">
            Interested in sponsoring? Contact partnerships — TBD.
          </p>
        </div>
      </section>
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-3 gap-4 py-2 border-b border-gray-100 last:border-0">
      <dt className="col-span-1 text-muted">{k}</dt>
      <dd className="col-span-2 text-ink">{v}</dd>
    </div>
  );
}
