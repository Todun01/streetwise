import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";
import { LogoOnDark } from "@/components/ui/logo";
import { HeroScene } from "@/features/landing/components/hero-scene";
import { HeroStage } from "@/features/landing/components/hero-stage";

export function Hero() {
  return (
    <HeroStage>
      {/* left half: logo, description, buttons */}
      <div className="flex flex-col justify-center gap-8 px-6 pb-4 pl-16 pt-12 sm:pl-24 lg:gap-12 lg:py-0 lg:pl-40 lg:pr-12">
        <h1>
          <LogoOnDark className="h-14 w-auto sm:h-20 lg:h-24" />
        </h1>

        <p className="max-w-xl text-xl text-cream-200 sm:text-2xl">
          Discover street food spots that aren&apos;t on any map. Walk there, eat well, and earn real
          money for the hidden gems you find.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link href="/signup" className={buttonClasses("primary")}>
            Get started
          </Link>
          <Link href="/#how-it-works" className={buttonClasses("onDark")}>
            See how it works
          </Link>
        </div>
      </div>

      {/* right half: the animation, centred in its half. Below the text on phones. */}
      <div data-hero-scene className="flex items-center justify-center px-4 py-10 lg:py-6">
        <HeroScene className="h-auto max-h-[calc(100dvh-8rem)] w-full max-w-[640px]" />
      </div>
    </HeroStage>
  );
}