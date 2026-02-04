import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "w0mlmrgwbziwquaq.public.blob.vercel-storage.com"
      }
    ]
  },
  // Suppress hydration warnings from browser extensions
  compiler: {
    reactRemoveProperties: {
      properties: [
        "bis_skin_checked",
        "bis_register",
        "__processed__",
        "data-new-gr-c-s-check-loaded",
        "data-gr-ext-installed",
      ],
    },
  },
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Logging configuration to reduce noise from hydration warnings
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

export default nextConfig;
