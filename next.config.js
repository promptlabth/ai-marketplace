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
  rewrites() {
    return [
      { source: '/:path*', destination: '/_next/:path*' }
    ]
  }
  };
  
  module.exports = nextConfig