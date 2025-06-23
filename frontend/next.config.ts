import type { NextConfig } from 'next';

function getDomainFromEnv(url?: string) {
  if (!url) return undefined;
  try {
    return new URL(url).hostname;
  } catch {
    return url.replace(/^https?:\/\//, '').split('/')[0];
  }
}

const backendDomain = getDomainFromEnv(process.env.NEXT_PUBLIC_API_URL);

const nextConfig: NextConfig = {
  images: {
    domains: backendDomain ? [backendDomain] : [],
  },
};

export default nextConfig;
