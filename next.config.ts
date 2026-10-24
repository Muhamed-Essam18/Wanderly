import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      // Old URLs used /cities/<country>; keep existing links working.
      { source: "/cities/:path*", destination: "/countries/:path*", permanent: true },
    ];
  },
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
