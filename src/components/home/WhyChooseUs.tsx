import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  BarChart3, 
  Users,
  ShieldCheck,
  Clock,
  Check,
  Star,
  Award,
  Globe,
  Lock,
  Sparkles
} from 'lucide-react';

const features = [
  {
    title: 'Expert Curation',
    description: 'Our team of robotics experts carefully selects and reviews all listed solutions.',
    icon: ShieldCheck,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    delay: 0.1
  },
  {
    title: 'Comprehensive Database',
    description: 'Access detailed specifications, pricing, and reviews for hundreds of robots.',
    icon: BarChart3,
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    delay: 0.2
  },
  {
    title: 'Community Driven',
    description: 'Join a growing community of robotics professionals and enthusiasts.',
    icon: Users,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    delay: 0.3
  },
  {
    title: 'Always Up-to-date',
    description: 'Get the latest information on new robotics technologies and updates.',
    icon: Clock,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    delay: 0.4
  }
];

const stats = [
  { id: 1, value: '500+', label: 'Robots Listed', icon: BarChart3 },
  { id: 2, value: '10K+', label: 'Monthly Users', icon: Users },
  { id: 3, value: '200+', label: 'Companies', icon: Globe },
  { id: 4, value: '50+', label: 'Integrations', icon: Lock }
];

const benefits = [
  'Comprehensive robot comparisons',
  'Unbiased expert reviews',
  'Real user experiences',
  'Latest industry insights'
];

const WhyChooseUs = () => {
  return (
    <section className="relative py-20 bg-white dark:bg-gray-950 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/10" />
      <div className="absolute -right-40 -top-40 w-80 h-80 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
      <div className="absolute -left-40 -bottom-40 w-80 h-80 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Why Choose Us
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            The Best Platform for
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mx-2">
              Robotics Solutions
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We make it easy to find the perfect robotics solution for your needs
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.delay }}
              className="group"
            >
              <div className="h-full bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`inline-flex items-center justify-center w-14 h-14 ${feature.bgColor} rounded-xl mb-6`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {feature.description}
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 mb-20 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/5 rounded-full"></div>
          <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-white/5 rounded-full"></div>
          
          <div className="relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6 mx-auto">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Why Our Users Love Us</h3>
              <p className="text-blue-100">Join thousands of satisfied users who found their perfect robotics solution</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="ml-3 text-lg text-white">{benefit}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <motion.button 
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-medium hover:bg-gray-100 transition-colors duration-200"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 ${index === 0 ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 
                index === 1 ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' :
                index === 2 ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' :
                'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'} rounded-xl mb-4 mx-auto`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
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
};

export default WhyChooseUs;
