declare module 'next-pwa' {
  import type { NextConfig } from 'next';

  interface PWAOptions {
    dest?: string;
    register?: boolean;
    skipWaiting?: boolean;
    [key: string]: unknown;
  }

  const nextPWA: (options?: PWAOptions) => (config: NextConfig) => NextConfig;

  export default nextPWA;
}
