/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add any config options here
  reactStrictMode: true,
  
  // Increase serverless function timeout
  serverExternalPackages: ['@google/generative-ai'],
  
  // Configure API route options
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  }
};

module.exports = nextConfig;
