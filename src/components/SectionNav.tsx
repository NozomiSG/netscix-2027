"use client";

import { useEffect, useState } from "react";

export default function SectionNav({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  function onAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
      setActive(id);
    }
  }

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-[72px] md:top-[88px] z-30 shadow-sm">
      <div className="mx-auto max-w-6xl px-6 flex gap-8 overflow-x-auto">
        {items.map((it) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            onClick={(e) => onAnchorClick(e, it.id)}
            className={`relative whitespace-nowrap py-4 text-sm font-medium transition-colors ${
              active === it.id ? "text-ink" : "text-muted hover:text-ink"
            }`}
          >
            {it.label}
            {active === it.id && (
              <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-ink" />
            )}
          </a>
        ))}
      </div>
    </nav>
  );
}
