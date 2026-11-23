import type { NextConfig } from "next";

// Served at /software on the main Nanashi domain. The Nanashi Inventions app
// rewrites /software/* to this app, so every route and asset lives under it.
const nextConfig: NextConfig = {
  basePath: "/software",
  reactStrictMode: true,
  poweredByHeader: false,
  // On this app's own address the bare "/" has nothing (everything lives under /software), so send
  // visitors there. On the main domain "/" belongs to Nanashi Inventions and never reaches this app.
  async redirects() {
    return [{ source: "/", destination: "/software", basePath: false, permanent: false }];
  },
};

export default nextConfig;
