import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    localPatterns: [
      {
        pathname: "/api/**",
      },
      {
        pathname: "/imgs/**",
      },
    ],
  },
};

export default nextConfig;
