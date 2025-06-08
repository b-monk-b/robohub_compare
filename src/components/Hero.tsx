import { Button } from './ui/button';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Star, Zap, Shield, BarChart2 } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)] opacity-5 dark:opacity-[0.03]"></div>
      <div className="absolute -left-20 -top-20 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left side - Text content */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              The Future of Robotics is Here
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Find Your Perfect 
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Robot Companion
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg leading-relaxed">
              Discover the perfect robotic solution tailored to your needs. Compare features, prices, and reviews from top brands all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button size="lg" className="text-lg group px-8 py-6 rounded-xl">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-xl">
                Watch Demo
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {[
                { text: '4.9/5 Rating', icon: Star },
                { text: 'Trusted by 10K+ Users', icon: Shield },
                { text: '500+ Robots', icon: BarChart2 }
              ].map((item, index) => (
                <div key={index} className="flex items-center bg-white dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
                  <item.icon className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right side - Image */}
          <div className="lg:w-1/2 relative w-full">
            <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
              <Image
                src="/robohub_images/Robot-image/image-removebg-preview (1).png"
                alt="Robot"
                fill
                className="object-contain object-center"
                priority
                quality={100}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Floating card 1 */}
              <motion.div 
                className="absolute top-8 left-0 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 w-40"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-2">
                    <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm font-medium">Smart Home</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Compatible with all major platforms</p>
              </motion.div>
              
              {/* Floating card 2 */}
              <motion.div 
                className="absolute bottom-8 right-0 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 w-44"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-2">
                    <Star className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm font-medium">Top Rated</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">4.9/5 from 1200+ reviews</p>
              </motion.div>
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-gray-950 dark:via-gray-950/50"></div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
