import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";
import { HeroScene } from "@/features/landing/components/hero-scene";

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-forest-900 text-cream-100"
    >
      {/* soft light behind the scene */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_50%_38%,#22432f_0%,#142a1c_72%)]"
      />

      {/* the road from the logo: asphalt with a double gold centre-line */}
      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-10 bg-asphalt sm:w-16 lg:w-24">
        <span className="absolute inset-y-0 left-1/2 ml-[-9px] w-1.5 bg-road-gold" />
        <span className="absolute inset-y-0 left-1/2 ml-[3px] w-1.5 bg-road-gold" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 pb-16 pt-8 text-center sm:px-6">
        <h1 className="sr-only">Streetwise</h1>

        <HeroScene className="w-full max-w-[620px]" />

        <p className="hero-fade -mt-4 max-w-xl text-xl text-cream-200 sm:text-2xl">
          Discover street food spots that aren&apos;t on any map. Walk there, eat well, and earn
          real money for the hidden gems you find.
        </p>

        <div className="hero-fade mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/signup" className={buttonClasses("primary")}>
            Get started
          </Link>
          <Link href="/#how-it-works" className={buttonClasses("onDark")}>
            See how it works
          </Link>
        </div>
      </div>
    </section>
  );
}