import Image from 'next/image';
import Link from 'next/link';
import { Robot } from '@/lib/supabase/robots';

export function RobotCard({ robot }: { robot: Robot }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
        {robot.image_url ? (
          <Image
            src={robot.image_url}
            alt={robot.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            <svg
              className="h-12 w-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        
        {/* Type Badge */}
        {robot.type && (
          <span className="absolute right-2 top-2 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            {robot.type}
          </span>
        )}
        
        {/* Comparison Button */}
        <button 
          className="absolute right-2 bottom-2 rounded-full bg-white/80 p-2 text-gray-700 shadow-md backdrop-blur-sm transition-colors hover:bg-white hover:text-blue-600 dark:bg-gray-800/80 dark:text-gray-200 dark:hover:bg-gray-700"
          title="Add to comparison"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16.34 7.05a1 1 0 10-.7 1.87 5.973 5.973 0 010 10.16 1 1 0 10.7 1.87 7.973 7.973 0 000-13.9z" />
          </svg>
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {robot.name}
        </h3>
        
        {/* Brand */}
        {robot.brand && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {robot.brand}
          </p>
        )}
        
        {/* Specifications */}
        <div className="mt-3 space-y-1 text-sm text-gray-700 dark:text-gray-300">
          {robot.specifications?.payload_kg && (
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Payload</span>
              <span className="font-medium">{robot.specifications.payload_kg} kg</span>
            </div>
          )}
          
          {robot.specifications?.reach_m && (
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Reach</span>
              <span className="font-medium">{robot.specifications.reach_m} m</span>
            </div>
          )}
          
          {/* Price Range */}
          {robot.price_range && (
            <div className="flex justify-between font-medium text-gray-900 dark:text-white">
              <span>Price Range</span>
              <span>{robot.price_range}</span>
            </div>
          )}
        </div>
        
        {/* View Details Button */}
        <div className="mt-4 flex items-center justify-between">
          <Link
            href={`/robots/${robot.slug}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            View Details
          </Link>
          
          <button 
            className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            title="Add to comparison"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
