import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Streetwise",
    short_name: "Streetwise",
    description: "Discover hidden street food spots that aren't on any map.",
    start_url: "/explore",
    display: "standalone",
    background_color: "#142a1c",
    theme_color: "#142a1c",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}