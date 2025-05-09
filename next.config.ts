import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  trailingSlash: true, 
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"], // ✅ Allow Unsplash images
    unoptimized: true,
  },
};

export default nextConfig;
