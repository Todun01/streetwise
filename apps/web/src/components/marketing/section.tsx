import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  className?: string;
  children: ReactNode;
}

/** Shared wrapper so every landing section has the same width, spacing and heading style. */
export function Section({ id, eyebrow, title, intro, className = "", children }: SectionProps) {
  return (
    <section id={id} className={`py-16 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {title && (
          <header className="mb-10 max-w-2xl">
            {eyebrow && (
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">{eyebrow}</p>
            )}
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
            {intro && <p className="mt-3 text-lg text-muted">{intro}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}