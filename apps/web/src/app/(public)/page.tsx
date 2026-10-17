import Link from "next/link";

export default function Landing() {
  return (
    <section className="flex min-h-[80dvh] flex-col justify-center gap-6">
      <h1 className="text-4xl font-bold tracking-tight">Streetwise</h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400">
        Find street food spots that aren&apos;t on any map, and earn money for the ones you discover.
      </p>
      <div className="flex gap-3">
        <Link href="/signup" className="rounded-lg bg-orange-600 px-5 py-3 font-medium text-white">
          Get started
        </Link>
        <Link href="/login" className="rounded-lg border border-neutral-300 px-5 py-3 font-medium dark:border-neutral-700">
          Sign in
        </Link>
      </div>
    </section>
  );
}