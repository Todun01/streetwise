import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

/** The frame shared by every auth page: a top bar, a centred column for the form, and a footer. */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" aria-label="Streetwise home">
          <Logo className="h-8 w-auto" />
        </Link>
        <ThemeToggle />
      </header>

      <main className="flex flex-1 items-center justify-center px-6 pb-12 pt-4 sm:px-10">
        <div className="w-full max-w-[26rem]">{children}</div>
      </main>

      <footer className="px-6 py-6 text-center text-sm text-muted sm:px-10">&copy; {new Date().getFullYear()} Streetwise</footer>
    </div>
  );
}