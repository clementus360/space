/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  env: {
    DEV_URL: process.env.DEV_URL,
    CYCLIC_URL: process.env.CYCLIC_URL,
    HEROKU_URL: process.env.HEROKU_URL,
    GCLOUD_URL: process.env.GCLOUD_URL,
  },
};

module.exports = nextConfig;
