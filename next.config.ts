import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow remote Unsplash images used by seed data
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
    // Allow locally-uploaded images served from /public/uploads
    localPatterns: [
      {
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
