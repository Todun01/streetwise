import Image from "next/image";

// Set width/height to your files' REAL pixel size (right-click the file → Properties → Details).
// Next.js uses them to reserve space and avoid layout jumps; CSS controls the displayed size.
const WIDTH = 551;
const HEIGHT = 123;

export function Logo({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <>
      {/* shown in dark mode: cream letters */}
      <Image
        src="/brand/wordmark-on-dark.png"
        alt="Streetwise"
        width={WIDTH}
        height={HEIGHT}
        className={`hidden dark:block ${className}`}
      />
      {/* shown in light mode: forest-green letters */}
      <Image
        src="/brand/wordmark-on-light.png"
        alt="Streetwise"
        width={WIDTH}
        height={HEIGHT}
        className={`dark:hidden ${className}`}
      />
    </>
  );
}
/** The cream-on-dark wordmark only, for surfaces that stay dark in both themes (the hero). */
export function LogoOnDark({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <Image src="/brand/wordmark-on-dark.png" alt="Streetwise" width={WIDTH} height={HEIGHT} className={className} />
  );
}