/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dexscreener.com',
      },
      {
        protocol: 'https',
        hostname: '**.dexscreener.com',
      },
      {
        protocol: 'https',
        hostname: 'img.fotofolio.xyz',
      },
      {
        protocol: 'https',
        hostname: '**.ipfs.nftstorage.link',
      },
      {
        protocol: 'https',
        hostname: 'creator-hub-prod.s3.us-east-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'static.jup.ag',
      },
      {
        protocol: 'https',
        hostname: 'www.orca.so',
      },
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  turbopack: {},
};

export default nextConfig;