import Image from "next/image";
import type { ReactNode } from "react";

interface PhoneFrameProps {
  /**
   * Path to the app screenshot inside /public, e.g. "/brand/screens/discover.webp".
   * Export it at 1179 x 2556 (an iPhone 15 screen) or any size with the same shape.
   * Leave it out and a placeholder screen is shown instead.
   */
  src?: string;
  /** What the screenshot shows, for screen readers. */
  alt: string;
  /** Placeholder only: the name of the screen that belongs here. */
  label: string;
  /** Placeholder only: an icon for that screen. */
  icon: ReactNode;
}

/**
 * An iPhone-style frame. Its width comes from the --phone-w CSS variable (set in globals.css),
 * so the frame, and the road connecting the steps, stay in step with each other.
 */
export function PhoneFrame({ src, alt, label, icon }: PhoneFrameProps) {
  return (
    <div className="relative isolate w-[var(--phone-w)]">
      {/* soft golden glow behind the phone */}
      <div
        aria-hidden="true"
        className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(245,173,29,0.16),transparent)]"
      />

      {/* the body: 10px of bezel all round (p-2.5) */}
      <div className="relative rounded-[2.75rem] bg-[#0b0f0d] p-2.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
        {/* side buttons */}
        <span aria-hidden="true" className="absolute -left-[3px] top-24 h-7 w-[3px] rounded-l bg-[#1a201d]" />
        <span aria-hidden="true" className="absolute -left-[3px] top-36 h-12 w-[3px] rounded-l bg-[#1a201d]" />
        <span aria-hidden="true" className="absolute -left-[3px] top-52 h-12 w-[3px] rounded-l bg-[#1a201d]" />
        <span aria-hidden="true" className="absolute -right-[3px] top-40 h-16 w-[3px] rounded-r bg-[#1a201d]" />

        {/* the screen */}
        <div className="relative aspect-[1179/2556] overflow-hidden rounded-[2.15rem] bg-forest-900">
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 250px, 72vw"
              className="object-cover"
            />
          ) : (
            <div
              role="img"
              aria-label={`${alt} (preview coming soon)`}
              className="flex h-full flex-col items-center justify-center gap-5 bg-[radial-gradient(70%_45%_at_50%_40%,#22432f_0%,#142a1c_100%)] px-6 text-center text-cream-100"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cream-100/15 bg-cream-100/5 text-gold-500">
                {icon}
              </span>
              <p className="text-base font-semibold">{label}</p>
              {/* faint bars, so it reads as an app screen */}
              <div className="w-full space-y-2.5">
                <div className="mx-auto h-2 w-3/4 rounded-full bg-cream-100/10" />
                <div className="mx-auto h-2 w-1/2 rounded-full bg-cream-100/10" />
                <div className="mx-auto h-2 w-2/3 rounded-full bg-cream-100/10" />
              </div>
              <p className="text-[0.65rem] uppercase tracking-widest text-cream-100/45">Preview coming soon</p>
            </div>
          )}

          {/* the dynamic island (the hardware, so it is not part of the screenshot) */}
          <span aria-hidden="true" className="absolute left-1/2 top-2.5 z-20 h-[22px] w-[78px] -translate-x-1/2 rounded-full bg-black" />
        </div>
      </div>
    </div>
  );
}