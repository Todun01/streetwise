import Image from "next/image";

// Set width/height to your files' REAL pixel size (right-click the file → Properties → Details).
// Next.js uses them to reserve space and avoid layout jumps; CSS controls the displayed size.
const WIDTH = 600;
const HEIGHT = 150;

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