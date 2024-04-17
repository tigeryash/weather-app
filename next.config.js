/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "littlevisuals.co",
      },
    ],
  },
};

module.exports = nextConfig;
