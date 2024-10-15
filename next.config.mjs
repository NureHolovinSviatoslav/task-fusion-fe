/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['@/components', '@/views', '@/layouts'],
    prependData: `@import '@/styles/_main.scss';`,
  },
};

export default nextConfig;
