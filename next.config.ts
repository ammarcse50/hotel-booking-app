import { typeConfig } from 'tailwindcss';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '3mb',
    },
  },
};
export default nextConfig;
