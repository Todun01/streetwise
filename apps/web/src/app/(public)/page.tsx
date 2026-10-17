import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export default function Landing() {
  return (
    <section className="flex min-h-[80dvh] flex-col justify-center gap-6">
      <h1 className="sr-only">Streetwise</h1>
      <Logo className="h-auto w-auto" />

      <p className="text-xl text-muted">
        Find street food spots that aren&apos;t on any map, and earn money for the ones you discover.
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