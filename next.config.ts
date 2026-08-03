import type { NextConfig } from "next";

// Node 22+ exposes a broken global localStorage when --localstorage-file is missing.
// Patch it before any dependency tries to use it during SSR.
if (typeof globalThis !== "undefined" && typeof window === "undefined") {
  const ls = (globalThis as Record<string, unknown>).localStorage;
  if (ls && typeof (ls as Record<string, unknown>).getItem !== "function") {
    const noop = () => null;
    (globalThis as Record<string, unknown>).localStorage = {
      getItem: noop,
      setItem: noop,
      removeItem: noop,
      clear: noop,
      key: noop,
      length: 0,
    };
  }
}

const nextConfig: NextConfig = {
  // Performance & Build Optimization
  poweredByHeader: false,
  compress: true,
  
  // Image Optimization
  images: {
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  },

  // Build Configuration
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ["@react-three/fiber", "@react-three/drei"],
  },

  // Headers for better caching and security
  async headers() {
    return [
      {
        source: "/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Redirects if needed
  async redirects() {
    return [];
  },
};

export default nextConfig;
