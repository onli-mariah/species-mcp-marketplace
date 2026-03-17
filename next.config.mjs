/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
async rewrites() {
  return [
    {
      source: '/quotes',
      destination: 'https://march-madness-phi.vercel.app/',
    },
    {
      source: '/quotes/:path*',
      destination: 'https://march-madness-phi.vercel.app/:path*',
    },
  ];
},
};

export default nextConfig
