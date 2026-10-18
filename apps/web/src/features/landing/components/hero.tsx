import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden dark:bg-[radial-gradient(60%_60%_at_75%_0%,#22432f_0%,transparent_70%)]">
      <div className="relative mx-auto flex min-h-[calc(100dvh-4rem)] max-w-6xl flex-col justify-center gap-6 px-4 py-16 sm:px-6 sm:pl-16">
        {/* the double centre-line from the logo */}
        <div aria-hidden="true" className="absolute inset-y-16 left-4 hidden gap-2 sm:left-6 sm:flex">
          <span className="w-1.5 rounded-full bg-road-gold" />
          <span className="w-1.5 rounded-full bg-road-gold" />
        </div>

        <h1 className="sr-only">Streetwise</h1>
        <Logo className="h-16 w-auto self-start sm:h-24" />

        <p className="max-w-xl text-xl text-muted sm:text-2xl">
          Discover street food spots that aren&apos;t on any map. Walk there, eat well, and earn
          credits for the hidden gems you find.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link href="/signup" className={buttonClasses("primary")}>
            Get started
          </Link>
          <Link href="/#how-it-works" className={buttonClasses("secondary")}>
            See how it works
          </Link>
        </div>
      </div>
    </section>
  );
}