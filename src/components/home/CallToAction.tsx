import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const CallToAction = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };
  return (
    <section className="relative py-16 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10 bg-[url('/images/patterns/grid.svg')] bg-center"></div>
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className="max-w-4xl mx-auto text-center" variants={itemVariants}>
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-blue-100 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            Get Started Today
          </span>
          
          <motion.h2 
            className="text-3xl font-bold text-white sm:text-4xl md:text-5xl leading-tight"
            variants={itemVariants}
          >
            Ready to find your perfect <span className="text-blue-200">robotics solution</span>?
          </motion.h2>
          
          <motion.p 
            className="mt-6 text-xl text-blue-100 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Join thousands of businesses that trust RoboHub Compare to find, compare, and implement the best robotics solutions for their needs.
          </motion.p>
          
          <motion.div 
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <Link 
              href="/robots" 
              className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-blue-700 bg-white rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center">
                Browse All Robots
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
            
            <Link 
              href="/contact" 
              className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-white border-2 border-white rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              <span className="relative z-10">
                Get Custom Quote
              </span>
              <span className="absolute inset-0 bg-white/5 backdrop-blur-sm group-hover:bg-white/10 transition-colors duration-300"></span>
            </Link>
          </motion.div>
          
          <motion.div 
            className="mt-8 flex items-center justify-center space-x-6"
            variants={itemVariants}
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white bg-blue-500"
                  style={{ zIndex: 5 - i }}
                ></div>
              ))}
            </div>
            <p className="text-sm text-blue-100">
              Trusted by <span className="font-semibold">10,000+</span> robotics professionals
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Animated dots decoration */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
