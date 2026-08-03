import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages (deploy via out/)
  output: "export",
  trailingSlash: true,

  // Performance & Build Optimization
  poweredByHeader: false,
  compress: true,
  
  // Image Optimization — Pages has no image optimizer, serve raw files
  images: {
    unoptimized: true,
  },

  // Build Configuration
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ["@react-three/fiber", "@react-three/drei"],
  },
};

export default nextConfig;
