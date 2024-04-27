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
    PROJECT_SITE_NAME: process.env.SITE_NAME,
    PROJECT_URL_WEBSITE: process.env.URL_WEBSITE,
  },
  reactStrictMode: false,
  webpack5: true,
  images: {
    domains: ["127.0.0.1","localhost",process.env.URL_WEBSITE,process.env.URL_WEBSITE_ROOT_DOMAIN],
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
