import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/20/solid';

interface Robot {
  id: number;
  category: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  image: string;
}

// Dummy data for featured robots
const featuredRobots = [
  {
    id: 1,
    category: 'Industrial',
    title: 'Industrial Robotic Arm',
    description: 'High-precision robotic arm for manufacturing and assembly lines.',
    price: 25000,
    rating: 4.9,
    image: '/images/robots/industrial-arm.jpg',
  },
  {
    id: 2,
    category: 'Service',
    title: 'Service Robot',
    description: 'Versatile service robot for hospitality and customer service applications.',
    price: 18900,
    rating: 4.7,
    image: '/images/robots/service-robot.jpg',
  },
  {
    id: 3,
    category: 'Collaborative',
    title: 'Cobot Welder',
    description: 'Collaborative robot designed for safe human-robot welding operations.',
    price: 32500,
    rating: 4.8,
    image: '/images/robots/cobot-welder.jpg',
  },
];

// Skeleton loader component
const RobotCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200 dark:bg-gray-800"></div>
    <div className="p-6">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
      </div>
    </div>
  </div>
);

const FeaturedRobots = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [robots, setRobots] = useState<Robot[]>([]);

  useEffect(() => {
    // Simulate API call
    const fetchRobots = async () => {
      try {
        // In a real app, you would fetch this data from your API
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        
        const dummyRobots: Robot[] = [
          {
            id: 1,
            category: 'Industrial',
            title: 'Industrial Robotic Arm',
            description: 'High-precision robotic arm for manufacturing and assembly lines.',
            price: 25000,
            rating: 4.9,
            image: '/images/robots/industrial-arm.jpg',
          },
          {
            id: 2,
            category: 'Service',
            title: 'Service Robot',
            description: 'Versatile service robot for hospitality and customer service applications.',
            price: 18900,
            rating: 4.7,
            image: '/images/robots/service-robot.jpg',
          },
          {
            id: 3,
            category: 'Collaborative',
            title: 'Cobot Welder',
            description: 'Collaborative robot designed for safe human-robot welding operations.',
            price: 32500,
            rating: 4.8,
            image: '/images/robots/cobot-welder.jpg',
          },
        ];

        setRobots(dummyRobots);
      } catch (error) {
        console.error('Error fetching robots:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRobots();
  }, []);
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <span className="text-blue-600 text-sm font-semibold tracking-wide uppercase">TOP SELECTIONS</span>
            <h2 className="mt-1 text-3xl font-extrabold text-gray-900 dark:text-white">Featured Robots</h2>
            <div className="w-20 h-1 bg-blue-600 mt-2"></div>
            <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
              Explore our handpicked selection of the most innovative and popular robotics solutions.
            </p>
          </div>
          <Link 
            href="/robots" 
            className="mt-4 md:mt-0 inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
          >
            View all robots
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Show skeleton loaders while loading
            Array(3).fill(0).map((_, index) => (
              <RobotCardSkeleton key={`skeleton-${index}`} />
            ))
          ) : robots.length > 0 ? (
            // Show actual robot cards when data is loaded
            robots.map((robot) => (
            <div key={robot.id} className="bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                <span className="absolute top-3 left-3 bg-white dark:bg-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {robot.category}
                </span>
                <div className="text-gray-400 dark:text-gray-600 text-center p-4">
                  [Robot Image]
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <span className="ml-1 text-gray-700 dark:text-gray-300 font-medium">
                      {robot.rating}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {robot.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {robot.description}
                </p>
                <div className="flex items-center justify-between mt-6">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ${robot.price.toLocaleString()}
                  </span>
                  <div className="flex space-x-3">
                    <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm">
                      View Details
                    </button>
                    <button className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 font-medium text-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            ))
          ) : (
            // Show empty state if no robots are found
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500 dark:text-gray-400">
                No featured robots available at the moment.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRobots;
