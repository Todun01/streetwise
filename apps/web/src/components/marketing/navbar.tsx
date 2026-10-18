"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { buttonClasses } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

const LINKS = [
  { id: "home", href: "/#home", label: "Home" },
  { id: "how-it-works", href: "/#how-it-works", label: "How it works" },
  { id: "nearby-spots", href: "/#nearby-spots", label: "Nearby spots" },
  { id: "contact", href: "/#contact", label: "Contact" },
];
const SECTION_IDS = LINKS.map((l) => l.id);

/** Which landing section is currently in the middle of the screen? */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return; // not on the landing page

    // watch a thin band near the top third of the screen; the section crossing it is "active"
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const close = () => setOpen(false);

  // Escape closes the mobile menu
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = (id: string) =>
    `text-sm font-medium transition-colors hover:text-foreground ${
      active === id ? "text-foreground" : "text-muted"
    }`;

  return (
    <header
      className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/#home" aria-label="Streetwise home" onClick={close}>
          <Logo className="h-8 w-auto" />
        </Link>

        {/* desktop */}
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.id}
              href={l.href}
              aria-current={active === l.id ? "location" : undefined}
              className={`${linkClass(l.id)} border-b-2 py-1 ${
                active === l.id ? "border-primary" : "border-transparent"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className={buttonClasses("secondary", "min-h-10 py-1.5 text-sm")}>
            Sign in
          </Link>
          <Link href="/signup" className={buttonClasses("primary", "min-h-10 py-1.5 text-sm")}>
            Get started
          </Link>
        </div>

        {/* mobile menu button */}
        <button
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-lg md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-border md:hidden">
          <nav aria-label="Mobile" className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
            {LINKS.map((l) => (
              <Link
                key={l.id}
                href={l.href}
                onClick={close}
                aria-current={active === l.id ? "location" : undefined}
                className={`rounded-lg px-3 py-3 text-base font-medium hover:bg-surface ${
                  active === l.id ? "bg-surface text-foreground" : "text-muted"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-3">
              <Link href="/login" onClick={close} className={buttonClasses("secondary")}>
                Sign in
              </Link>
              <Link href="/signup" onClick={close} className={buttonClasses("primary")}>
                Get started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}