/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // يخلي Vercel يتجاهل أخطاء ESLint أثناء الـ build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // يخلي Vercel يتجاهل أخطاء TypeScript أثناء الـ build
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "exam.elevateegy.com",
      },
    ],
  },
};

module.exports = nextConfig;
