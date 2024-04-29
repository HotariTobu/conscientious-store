/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async () => [
    {
      source: '/dashboard',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
  ]
};

export default nextConfig;
