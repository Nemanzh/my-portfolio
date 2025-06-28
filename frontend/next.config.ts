// frontend/next.config.ts
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: (process.env.NEXT_IMAGE_PROTOCOL || 'https') as
          | 'http'
          | 'https',
        hostname: process.env.NEXT_HOST_NAME || '',
        port: process.env.NEXT_HOST_PORT || '',
        pathname: process.env.NEXT_PATHNAME || '/uploads/**',
      },
    ],
    unoptimized: false,
  },
  output: 'standalone',
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default withNextIntl(nextConfig);
