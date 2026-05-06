"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

type Child = { label: string; href: string };
type Item = { label: string; href: string; children?: Child[] };

const NAV: Item[] = [
  { label: "Home", href: "/" },
  {
    label: "Key Dates",
    href: "/key-dates",
    children: [
      { label: "Important Dates", href: "/key-dates#milestones" },
      { label: "Schedule", href: "/key-dates#schedule" },
    ],
  },
  {
    label: "Speakers",
    href: "/speakers",
    children: [
      { label: "Keynote Speakers", href: "/speakers#keynotes" },
      { label: "Invited Speakers", href: "/speakers#invited" },
      { label: "Schools", href: "/speakers#schools" },
    ],
  },
  {
    label: "Program",
    href: "/program",
    children: [
      { label: "Overview", href: "/program#overview" },
      { label: "Simplified Program", href: "/program#simplified" },
      { label: "Detailed Program", href: "/program#detailed" },
      { label: "Awards", href: "/program#awards" },
    ],
  },
  {
    label: "Submission",
    href: "/abstracts",
    children: [
      { label: "Deadlines", href: "/abstracts#deadlines" },
      { label: "Guidelines", href: "/abstracts#guidelines" },
      { label: "Submit", href: "/abstracts#submit" },
      { label: "FAQ", href: "/abstracts#faq" },
    ],
  },
  {
    label: "Registration",
    href: "/registration",
    children: [
      { label: "Deadlines", href: "/registration#deadlines" },
      { label: "Fees", href: "/registration#fees" },
      { label: "Bank details", href: "/registration#bank" },
      { label: "Register", href: "/registration#register" },
      { label: "What's included", href: "/registration#included" },
      { label: "FAQ", href: "/registration#faq" },
    ],
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Venue", href: "/about#venue" },
      { label: "Accommodation", href: "/about#accommodation" },
      { label: "Organizing Committee", href: "/about#committee" },
      { label: "Sponsors", href: "/about#sponsors" },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  // Close any open dropdown when route changes
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenMenu(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  }
  function cancelClose() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-6 h-[72px] md:h-[88px] flex items-center justify-between">
        <Link href="/" aria-label="NetSciX 2027 home" className="flex items-center">
          <Image
            src="/images/logo_1_svg.png"
            alt="NetSciX 2027 — Hong Kong"
            width={5536}
            height={2888}
            priority
            className="h-16 md:h-20 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-stretch gap-1">
          {NAV.map((item) => (
            <NavTrigger
              key={item.href}
              item={item}
              pathname={pathname}
              isOpen={openMenu === item.href}
              onOpen={() => {
                cancelClose();
                setOpenMenu(item.href);
              }}
              onClose={scheduleClose}
            />
          ))}
        </nav>

        <button
          aria-label="Toggle menu"
          className="md:hidden p-2 text-ink"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <>
                <path d="M4 7h16" strokeLinecap="round" />
                <path d="M4 12h16" strokeLinecap="round" />
                <path d="M4 17h16" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-6 py-4 flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
            {NAV.map((item) => (
              <div key={item.href} className="py-1">
                <SmartLink
                  href={item.href}
                  pathname={pathname}
                  onAfterClick={() => setMobileOpen(false)}
                  className="block py-1.5 text-sm font-semibold text-ink"
                >
                  {item.label}
                </SmartLink>
                {item.children && (
                  <ul className="mt-1 ml-3 border-l border-gray-200 pl-3 space-y-1">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <SmartLink
                          href={c.href}
                          pathname={pathname}
                          onAfterClick={() => setMobileOpen(false)}
                          className="block py-1 text-sm text-muted hover:text-ink"
                        >
                          {c.label}
                        </SmartLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function NavTrigger({
  item,
  pathname,
  isOpen,
  onOpen,
  onClose,
}: {
  item: Item;
  pathname: string | null;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const hasChildren = !!item.children?.length;
  const active = pathname === item.href || pathname?.startsWith(item.href + "/");

  return (
    <div
      className="relative flex items-stretch"
      onMouseEnter={hasChildren ? onOpen : undefined}
      onMouseLeave={hasChildren ? onClose : undefined}
    >
      <SmartLink
        href={item.href}
        pathname={pathname}
        onAfterClick={onClose}
        className={
          "inline-flex items-center gap-1 px-3 text-sm font-medium tracking-wide transition-colors " +
          (active ? "text-ink" : "text-ink/80 hover:text-ink")
        }
      >
        {item.label}
        {hasChildren && (
          <ChevronDown
            className={
              "h-3.5 w-3.5 text-muted transition-transform duration-200 " +
              (isOpen ? "rotate-180" : "")
            }
          />
        )}
      </SmartLink>

      {hasChildren && (
        <div
          className={
            "absolute left-1/2 -translate-x-1/2 top-full pt-2 transition duration-200 ease-out " +
            (isOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-1 pointer-events-none")
          }
          aria-hidden={!isOpen}
        >
          <div className="min-w-[240px] bg-white border border-gray-200 rounded-lg shadow-xl py-2">
            <ul>
              {item.children!.map((c) => (
                <li key={c.href}>
                  <SmartLink
                    href={c.href}
                    pathname={pathname}
                    onAfterClick={onClose}
                    className="block px-4 py-2 text-sm text-ink hover:bg-gray-50 hover:text-brand transition-colors"
                  >
                    {c.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function SmartLink({
  href,
  pathname,
  className,
  children,
  onAfterClick,
}: {
  href: string;
  pathname: string | null;
  className?: string;
  children: React.ReactNode;
  onAfterClick?: () => void;
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const hashIdx = href.indexOf("#");
    if (hashIdx === -1) {
      onAfterClick?.();
      return;
    }
    const path = href.slice(0, hashIdx);
    const hash = href.slice(hashIdx + 1);
    const samePath = path === "" || path === pathname;
    if (samePath && hash) {
      e.preventDefault();
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${hash}`);
      }
      // Blur so focus-within / focus styles don't keep the menu visually "active".
      (e.currentTarget as HTMLElement).blur();
      onAfterClick?.();
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
