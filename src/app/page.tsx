"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  return (
    <>
      {/* Hero — Location & Date */}
      <section
        className="relative text-white h-[560px] md:h-[640px] flex items-center justify-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.55)), url(/images/hero-manson-yim.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="px-6 text-center">
          <p className="font-serif text-3xl md:text-5xl leading-tight text-white drop-shadow-md">
            International School and Conference
            <br />
            on Network Science
          </p>

          <div className="mt-12 flex flex-col items-center gap-3">
            <span className="block h-px w-32 bg-white/70" />
            <p className="text-2xl md:text-3xl font-light tracking-[0.2em]">Feb 2027</p>
            <p className="text-2xl md:text-3xl font-light tracking-[0.2em]">Hong Kong SAR</p>
            <span className="block h-px w-32 bg-white/70" />
          </div>
        </div>
      </section>

      {/* Description */}
      <section id="about" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 grid gap-12 md:grid-cols-2 items-center">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-sm shadow-md">
            <Image
              src="/images/robert-bye.jpg"
              alt="Image by Robert Bye"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand">About the Conference</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl font-bold text-ink">
              NetSciX 2027
            </h2>
            <div className="mt-6 space-y-5 text-gray-700 leading-relaxed">
              <p>
                Thank you for your participation in the NetSciX 2027 International School and
                Conference on Network Science in Hong Kong SAR.
              </p>
              <p>
                The committee is also thankful to our partners and expresses its gratitude for
                their generous financial support which made NetSciX 2027 possible. NetSciX 2027
                will be held in Feb. 2027, in Hong Kong.
              </p>
              <p>Looking forward to seeing you there!</p>
            </div>
            <div className="mt-8 border-l-2 border-brand pl-4">
              <p className="font-serif text-lg font-semibold text-ink">Jie Sun</p>
              <p className="text-sm text-muted">Conference Chair</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Hong Kong */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-20 grid gap-12 md:grid-cols-2 items-center">
          <div className="md:order-2 relative aspect-[6/5] w-full overflow-hidden rounded-sm shadow-md">
            <Image
              src="/images/sebastien-goldberg.jpg"
              alt="Image by Sébastien Goldberg"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="md:order-1">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink">
              NetSciX 2027 — Hong Kong
            </h2>
            <p className="mt-6 text-gray-700 leading-relaxed">
              Hong Kong is a vibrant, world-class city that perfectly embodies the
              interdisciplinary spirit of NetSci. As a global hub for commerce, innovation, and
              culture, Hong Kong offers a dynamic backdrop for networking and collaboration
              among researchers from diverse fields. The city is home to leading universities,
              cutting-edge research institutions, and a thriving tech industry, making it an
              ideal location to explore the latest advances in network science. Attendees will
              also appreciate Hong Kong&rsquo;s unique blend of East-meets-West culture, stunning
              skyline, and lush natural landscapes — from Victoria Peak to its scenic hiking
              trails. With its ease of travel, English-friendly environment, and reputation as a
              gateway to Asia, Hong Kong promises an engaging and memorable experience for the
              NetSci community.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Quick Links */}
      <section id="quick-links" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-brand">Get Involved</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl font-bold text-ink">
              Quick Links
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Submit your work, secure your seat, and start planning your trip to Hong Kong.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <QuickLink
              title="Register"
              desc="Fees, deadlines, and how to secure your pass."
              cta="View registration →"
              href="/registration"
            />
            <QuickLink
              title="Submit Abstract"
              desc="Share your latest research with the community."
              cta="View call for abstracts →"
              href="/abstracts"
            />
            <QuickLink
              title="Program"
              desc="Browse the schedule, talks, and sessions."
              cta="View program →"
              href="/program"
            />
            <QuickLink
              title="Travel & Venue"
              desc="Sheraton Tsim Sha Tsui — getting here, and where to stay."
              cta="Plan your trip →"
              href="/about"
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <ContactSection />
    </>
  );
}

function QuickLink({
  title,
  desc,
  cta,
  href,
}: {
  title: string;
  desc: string;
  cta: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group p-6 rounded-lg border border-gray-200 bg-white hover:border-ink hover:shadow-md transition flex flex-col"
    >
      <h3 className="font-serif text-xl font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-gray-600 flex-1">{desc}</p>
      <span className="mt-4 text-sm text-brand font-medium group-hover:underline">{cta}</span>
    </Link>
  );
}

function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  return (
    <section id="contact" className="bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-brand">Get in Touch</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl font-bold text-ink">Contact</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Reach out to the NetSciX 2027 Secretariat — we are happy to help.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 items-start">
          {/* Left — address & contact info */}
          <div className="space-y-6 md:pt-8">
            <InfoBlock
              title="NetSciX 2027 Secretariat"
              lines={[
                "Sheraton Hong Kong Hotel & Towers",
                "20 Nathan Road, Tsim Sha Tsui",
                "Kowloon, Hong Kong",
              ]}
            />
            <InfoBlock
              title="Office Hours"
              lines={["Monday to Friday", "09:00 – 16:00 (Beijing time)"]}
            />
            <InfoBlock
              title="Email"
              lines={[
                "General enquiries — TBD",
                "Abstract submission — TBD",
                "Partnerships — TBD",
              ]}
            />
          </div>

          {/* Right — Send us a message */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center">
                <h3 className="font-serif text-xl text-ink">Thank you!</h3>
                <p className="mt-2 text-gray-600">We have received your message.</p>
              </div>
            ) : (
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setError("");
                  setSubmitting(true);
                  const fd = new FormData(e.currentTarget);
                  const payload = Object.fromEntries(fd.entries());
                  try {
                    const res = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "content-type": "application/json" },
                      body: JSON.stringify(payload),
                    });
                    const json = await res.json();
                    if (!res.ok) {
                      setError(json?.error || "Submission failed.");
                    } else {
                      setSubmitted(true);
                    }
                  } catch {
                    setError("Network error.");
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                <h3 className="font-serif text-xl font-bold text-ink mb-2">Send us a message</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="First Name" name="firstName" />
                  <Field label="Last Name" name="lastName" />
                </div>
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" />
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full rounded-md border border-gray-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink"
                  />
                </div>
                {error && (
                  <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-ink text-white px-8 py-3 rounded-md font-medium hover:bg-black transition disabled:opacity-60"
                >
                  {submitting ? "Sending…" : "Submit"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Full-width map below */}
        <div className="mt-12 h-[360px] md:h-[420px] w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm">
          <iframe
            title="Sheraton Hong Kong Hotel & Towers map"
            src="https://maps.google.com/maps?q=Sheraton+Hong+Kong+Hotel+%26+Towers,+20+Nathan+Road,+Tsim+Sha+Tsui&t=&z=16&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function InfoBlock({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold tracking-wide text-ink uppercase">{title}</h3>
      <div className="mt-2 space-y-1 text-gray-600">
        {lines.map((l) => (
          <div key={l}>{l}</div>
        ))}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink mb-1.5">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-md border border-gray-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink"
      />
    </div>
  );
}
