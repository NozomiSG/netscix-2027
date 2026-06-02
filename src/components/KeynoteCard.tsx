"use client";

import { useEffect, useRef, useState } from "react";
import SpeakerAvatar from "@/components/SpeakerAvatar";

type Speaker = {
  name: string;
  affiliation: string;
  website?: string;
  photo?: string;
  bio?: string[];
};

// Rough fallback for the collapsed bio height, in px, used until the client
// measures the actual left column. Mirrors avatar 210px + name/affiliation/
// website ≈ 80px on md+. Keeps the layout collapsed during SSR / before JS
// hydrates, so the bio doesn't briefly flash at full height.
const FALLBACK_COLLAPSED = 290;

export default function KeynoteCard({ speaker }: { speaker: Speaker }) {
  const leftRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const [leftHeight, setLeftHeight] = useState<number | null>(null);
  const [bioHeight, setBioHeight] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const left = leftRef.current;
    const bio = bioRef.current;
    if (!left || !bio) return;

    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const lh = left.offsetHeight;
        const bh = bio.scrollHeight;
        if (lh > 0) setLeftHeight(lh);
        if (bh > 0) setBioHeight(bh);
      });
    };

    schedule();

    const ro = new ResizeObserver(schedule);
    ro.observe(left);
    ro.observe(bio);

    // Web fonts can change line metrics; re-measure once they settle.
    const fonts = (document as Document & { fonts?: { ready?: Promise<unknown> } }).fonts;
    fonts?.ready?.then(schedule).catch(() => {});

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  const hasBio = !!speaker.bio?.length;
  const collapsed = leftHeight ?? FALLBACK_COLLAPSED;
  // Assume overflow until measured: keeps bio collapsed during SSR. Once
  // bioHeight is known, the real comparison takes over.
  const overflows = hasBio && (bioHeight === null || bioHeight > collapsed + 8);

  let maxHeight: number | string = "none";
  if (overflows) {
    maxHeight = expanded ? bioHeight ?? 9999 : collapsed;
  }

  return (
    <article className="grid gap-6 md:grid-cols-[210px_1fr] md:gap-8 border-b border-gray-200 pb-12 last:border-0 last:pb-0">
      <div ref={leftRef} className="flex flex-col items-start gap-3">
        <SpeakerAvatar
          src={speaker.photo}
          name={speaker.name}
          className="w-40 md:w-full aspect-square rounded-xl"
          textClassName="text-4xl"
        />
        <div>
          <h3 className="font-serif text-xl font-bold text-ink">{speaker.name}</h3>
          <p className="text-sm text-muted">{speaker.affiliation}</p>
          {speaker.website && (
            <a
              href={speaker.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-sm font-medium text-brand hover:underline"
            >
              Website →
            </a>
          )}
        </div>
      </div>

      <div>
        <div
          className="relative overflow-hidden transition-[max-height] duration-300 ease-out"
          style={{ maxHeight }}
        >
          <div
            ref={bioRef}
            className="space-y-4 text-[15px] leading-relaxed text-gray-700 text-justify hyphens-auto"
          >
            {hasBio ? (
              speaker.bio!.map((para, j) => <p key={j}>{para}</p>)
            ) : (
              <p className="text-muted italic">Full bio coming soon.</p>
            )}
          </div>
          {overflows && !expanded && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent"
            />
          )}
        </div>

        {overflows && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
          >
            {expanded ? "Show less" : "Read more"}
            <span aria-hidden>{expanded ? "↑" : "↓"}</span>
          </button>
        )}
      </div>
    </article>
  );
}
