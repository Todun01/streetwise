import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { site } from "@/lib/site";

const linkStyle = "text-sm text-muted transition-colors hover:text-foreground";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo className="h-8 w-auto" />
            <p className="mt-4 max-w-xs text-sm text-muted">{site.tagline}</p>
          </div>

          <nav aria-label="Explore">
            <h3 className="text-sm font-semibold">Explore</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/#how-it-works" className={linkStyle}>How it works</Link></li>
              <li><Link href="/#nearby-spots" className={linkStyle}>Nearby spots</Link></li>
              <li><Link href="/#contact" className={linkStyle}>Contact</Link></li>
            </ul>
          </nav>

          <nav aria-label="Account">
            <h3 className="text-sm font-semibold">Account</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/signup" className={linkStyle}>Create an account</Link></li>
              <li><Link href="/login" className={linkStyle}>Sign in</Link></li>
            </ul>
          </nav>
        </div>

        <p className="mt-10 border-t border-border pt-6 text-sm text-muted">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}