/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // TS-specific options
    ignoreBuildErrors: false
  },
  // Other Next.js configuration options
}

module.exports = nextConfig
