import Link from "next/link";

export default function Landing() {
  return (
    <section className="flex min-h-[80dvh] flex-col justify-center gap-6">
      {/* the double centre-line from the logo */}
      <div className="flex gap-1.5" aria-hidden="true">
        <span className="h-12 w-1.5 rounded-full bg-road-gold" />
        <span className="h-12 w-1.5 rounded-full bg-road-gold" />
      </div>

      <h1 className="text-4xl font-bold tracking-tight">Streetwise</h1>
      <p className="text-lg text-muted">
        Find street food spots that aren&apos;t on any map, and earn credits for the ones you discover.
      </p>
      <div className="flex gap-3">
        <Link
          href="/signup"
          className="rounded-lg bg-primary px-5 py-3 font-medium text-on-primary hover:bg-primary-hover"
        >
          Get started
        </Link>
        <Link
          href="/login"
          className="rounded-lg border border-border px-5 py-3 font-medium text-foreground hover:border-accent"
        >
          Sign in
        </Link>
      </div>
    </section>
  );
}