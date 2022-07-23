/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  env: {
    CYCLIC_URL: process.env.CYCLIC_URL,
    HEROKU_URL: process.env.HEROKU_URL,
  },
};

module.exports = nextConfig;
