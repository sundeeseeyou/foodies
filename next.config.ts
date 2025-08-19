import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-f73c833e7030415f8029674b94a709a5.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
