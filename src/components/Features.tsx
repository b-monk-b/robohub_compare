import React from 'react';

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big w-6 h-6 text-blue-600">
        <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
        <path d="m9 11 3 3L22 4"></path>
      </svg>
    ),
    title: 'Easy Comparison',
    description: 'Quickly compare features, specifications, and prices of different robot models side by side.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-no-axes-column w-6 h-6 text-blue-600">
        <line x1="18" x2="18" y1="20" y2="10"></line>
        <line x1="12" x2="12" y1="20" y2="4"></line>
        <line x1="6" x2="6" y1="20" y2="14"></line>
      </svg>
    ),
    title: 'Detailed Analytics',
    description: 'Get in-depth analysis and performance metrics for each robot to make informed decisions.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap w-6 h-6 text-blue-600">
        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
      </svg>
    ),
    title: 'Latest Models',
    description: 'Stay updated with the newest robot models and their cutting-edge technologies.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield w-6 h-6 text-blue-600">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
      </svg>
    ),
    title: 'Trusted Reviews',
    description: 'Read authentic reviews from experts and other users to guide your purchase.'
  }
];

export function Features() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex items-center font-medium whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-transparent border text-gray-700 border-gray-300 dark:text-gray-300 dark:border-gray-600 text-xs px-2 py-0.5 rounded-md mb-4">
            <span className="flex items-center">Why Choose Us</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Find Your Perfect Robot Companion
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our platform helps you make the best decision with comprehensive comparisons and expert insights.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative flex flex-col overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 hover:shadow-lg transition-shadow duration-300 h-full"
              aria-disabled="false"
            >
              <div className="flex-1 p-4 sm:p-6">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
