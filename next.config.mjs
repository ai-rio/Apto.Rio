/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', // GitHub avatars
      },
    ],
  },
  // Add domain configuration
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.apto.rio.br' }],
        destination: 'https://apto.rio.br/:path*',
        permanent: true,
      },
    ]
  },
  // Add custom domain configuration
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
        has: [
          {
            type: 'host',
            value: 'apto.rio.br',
          },
        ],
      },
    ]
  },
}

export default nextConfig
