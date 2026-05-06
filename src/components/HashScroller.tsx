"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * On client navigation that lands with a #hash (e.g. /key-dates#schedule),
 * smooth-scroll to the target after the destination renders. The browser's
 * default behaviour is an instant jump, which we override here.
 */
export default function HashScroller() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    // Wait a tick so the new page has painted and the target exists.
    const id = window.requestAnimationFrame(() => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
