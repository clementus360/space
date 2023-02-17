/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  env: {
    PROD_AWS_URL: process.env.PROD_AWS_URL,
  },
};

module.exports = nextConfig;
