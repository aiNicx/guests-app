import type { NextConfig } from 'next';

const nextConfig: NextConfig = {};

const withPWA = async (config: NextConfig) => {
  if (process.env.NODE_ENV === 'development') {
    return config;
  }

  const { default: nextPWA } = await import('next-pwa');

  return nextPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    ...config,
  });
};

export default withPWA(nextConfig);
