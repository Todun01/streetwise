import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // the shared package ships TypeScript source, so Next must compile it
  transpilePackages: ["@streetwise/shared"],
};

export default nextConfig;