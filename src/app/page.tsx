'use client';

import dynamic from 'next/dynamic';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { BlogSection } from '@/components/BlogSection';

// Import other components with SSR disabled where needed
const TrustedBy = dynamic(() => import('@/components/home/TrustedBy'), { ssr: false });
const FeaturedRobots = dynamic(() => import('@/components/home/FeaturedRobots'), { ssr: false });
const CallToAction = dynamic(() => import('@/components/home/CallToAction'), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* New Hero Section */}
      <Hero />

      {/* Trusted By Section */}
      <TrustedBy />

      {/* New Features Section */}
      <Features />

      {/* Featured Robots Section */}
      <FeaturedRobots />

      {/* New Blog Section */}
      <BlogSection />
      
      {/* CTA Section */}
      <CallToAction />
    </div>
  );
}
