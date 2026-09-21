import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Add remote hosts here if project photos are served from a CDN or CMS.
    remotePatterns: [],
  },
  async redirects() {
    return [
      // Every route lives under /en or /ar. Send the bare root to the default locale.
      { source: '/', destination: '/ar', permanent: false },
    ];
  },
};

export default nextConfig;
