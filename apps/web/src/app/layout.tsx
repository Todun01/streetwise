import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SplashScreen } from "@/components/layout/splash-screen";
import { QueryProvider } from "@/lib/query-provider";
import { SPLASH_INIT_SCRIPT } from "@/lib/splash";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Streetwise", template: "%s · Streetwise" },
  description: "Discover hidden street food spots that aren't on any map.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6efdf" },
    { media: "(prefers-color-scheme: dark)", color: "#142a1c" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the head script adds classes to <html> before React starts
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SPLASH_INIT_SCRIPT }} />
        <noscript>
          <style>{".splash{display:none}"}</style>
        </noscript>
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SplashScreen />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}