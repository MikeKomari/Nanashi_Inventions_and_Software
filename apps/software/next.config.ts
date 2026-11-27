import type { NextConfig } from "next";

// Served at /software on the main Nanashi domain. The Nanashi Inventions app
// rewrites /software/* to this app, so every route and asset lives under it.
const nextConfig: NextConfig = {
  basePath: "/software",
  reactStrictMode: true,
  poweredByHeader: false,
  // One styled 404 for every route: needed because the site and each demo have separate root layouts.
  experimental: { globalNotFound: true },
  // On this app's own address the bare "/" has nothing (everything lives under /software), so send
  // visitors there. On the main domain "/" belongs to Nanashi Inventions and never reaches this app.
  async redirects() {
    return [
      { source: "/", destination: "/software", basePath: false, permanent: false },
      // Crawlers only read /robots.txt at the root and follow redirects. (A rewrite can't leave the basePath.)
      { source: "/robots.txt", destination: "/software/robots.txt", basePath: false, permanent: false },
      { source: "/sitemap.xml", destination: "/software/sitemap.xml", basePath: false, permanent: false },
    ];
  },
};

export default nextConfig;
