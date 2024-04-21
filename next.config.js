const generateRobotsTxtAndSitemapXml = require("./scripts/generate-robots-txt");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  experimental: {
    instrumentationHook: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;

module.exports = {
  env: {
    PROJECT_NAME: 'newszipped',
  },
  reactStrictMode: false,
  webpack5: true,
  images: {
    domains: ["127.0.0.1","localhost","newszipped.com","https://newszipped-new.vercel.app"],
    unoptimized: true
  },
  webpack(config, { isServer }) {
    config.resolve.fallback = { fs: false };
    if (isServer) {
      generateRobotsTxtAndSitemapXml();
    }
    return config;
  },
};
