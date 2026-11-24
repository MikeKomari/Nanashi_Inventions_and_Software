import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// Nanashi Software is a separate Vercel project served at /software on this domain (F-04).
// Set SOFTWARE_ORIGIN to its address, e.g. https://nanashi-software.vercel.app. Unset: no rewrite.
const softwareOrigin = process.env.SOFTWARE_ORIGIN?.replace(/\/$/, "");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Engineering articles are MDX files in content/engineering/, imported as components.
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  poweredByHeader: false,
  async rewrites() {
    if (!softwareOrigin) return [];
    return [
      { source: "/software", destination: `${softwareOrigin}/software` },
      { source: "/software/:path*", destination: `${softwareOrigin}/software/:path*` },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
