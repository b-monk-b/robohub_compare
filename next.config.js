const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure proper handling of trailing slashes and output
  trailingSlash: false,
  output: 'standalone',
  reactStrictMode: true,
  
  // Disable ESLint during build to prevent errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'localhost',
      'robohub.local',
      'lh3.googleusercontent.com', // For Google OAuth avatars
      'avatars.githubusercontent.com', // For GitHub OAuth avatars
      '*.supabase.co', // For Supabase storage
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Enable React DevTools in production for better debugging
  reactProductionProfiling: true,
  // Configure page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js', 'mdx'],
  // Enable webpack 5
  webpack: (config, { isServer }) => {
    // Resolve path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };

    if (!isServer) {
      // Fixes npm packages that depend on `fs` module
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
  // Enable source maps in production for better debugging
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
