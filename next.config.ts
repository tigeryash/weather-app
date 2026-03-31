import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "littlevisuals.co",
      },
    ],
  },
};

export default nextConfig;
