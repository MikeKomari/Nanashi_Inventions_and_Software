import type { NextConfig } from "next";

// Served at /software on the main Nanashi domain. The Nanashi Inventions app
// rewrites /software/* to this app, so every route and asset lives under it.
const nextConfig: NextConfig = {
  basePath: "/software",
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
