/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.nike.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
