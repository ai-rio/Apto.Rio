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
  // Configure allowed hostnames
  experimental: {
    serverActions: true,
  },
  // Add custom domain configuration
  production: {
    domains: ['apto.rio.br', 'www.apto.rio.br'],
  },
}

export default nextConfig
