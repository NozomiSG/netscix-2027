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

export default function KeynoteCard({ speaker }: { speaker: Speaker }) {
  const leftRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const [collapsedHeight, setCollapsedHeight] = useState<number | null>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const left = leftRef.current;
    const bio = bioRef.current;
    if (!left || !bio) return;
    const measure = () => {
      setCollapsedHeight(left.offsetHeight);
      setContentHeight(bio.scrollHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(left);
    ro.observe(bio);
    return () => ro.disconnect();
  }, []);

  const hasBio = !!speaker.bio?.length;
  const overflows =
    hasBio &&
    collapsedHeight !== null &&
    contentHeight !== null &&
    contentHeight > collapsedHeight + 8;

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
          style={
            overflows
              ? { maxHeight: expanded ? contentHeight! : collapsedHeight! }
              : undefined
          }
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
