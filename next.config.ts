import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/day-by-day-next",
  assetPrefix: "/day-by-day-next/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;