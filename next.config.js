/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config')

const nextConfig = {
    images: {
      domains: ['storage.googleapis.com'],
    },
    i18n,
    webpack(config) {
      config.resolve.fallback = {
          ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
          // by next.js will be dropped. Doesn't make much sense, but how it is
          fs: false, // the solution
      };

      return config;
  },
  reactStrictMode: true,
  };
  
  module.exports = nextConfig