/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: false,
  },
  // Allow ngrok for development testing on mobile/external devices
  // https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins
  allowedDevOrigins: [
    'http://localhost:3000',
    'https://*.ngrok-free.app',
    'https://*.ngrok.io',
    'https://kolade.pro',
    'https://www.kolade.pro',
    'https://kangaroo-living-bison.ngrok-free.app',
    'https://www.kangaroo-living-bison.ngrok-free.app',
  ],
}

export default nextConfig
