/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config')

const nextConfig = {
    images: {
      domains: ['storage.googleapis.com'],
    },
    i18n,
  };
  
  module.exports = nextConfig