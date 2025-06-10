import { Metadata } from 'next';
import { getFilterOptions, getRobots } from '@/lib/supabase/robots';
import { RobotCard } from '@/components/robots/robot-card';
import { RobotFilters } from '@/components/robots/robot-filters';

// Define types for search params
interface SearchParams {
  search?: string;
  type?: string | string[];
  application?: string | string[];
  brand?: string | string[];
  min_price?: string;
  max_price?: string;
  sort_by?: string;
  page?: string;
  per_page?: string;
}

// Define types for parsed search params
interface ParsedSearchParams {
  search?: string;
  type?: string[];
  application?: string[];
  brand?: string[];
  min_price?: number;
  max_price?: number;
  sort_by: string;
  page: number;
  per_page: number;
}

export const metadata: Metadata = {
  title: 'Discover Robots - Robot Hub',
  description: 'Browse our comprehensive directory of industrial, commercial, and consumer robots.',
  openGraph: {
    title: 'Discover Robots - Robot Hub',
    description: 'Browse our comprehensive directory of industrial, commercial, and consumer robots.',
    type: 'website',
    locale: 'en_US',
    url: 'https://robohub-compare.vercel.app/robots',
    siteName: 'Robot Hub',
    // Only include valid OpenGraph properties
  },
  robots: 'index, follow',
  generator: 'Next.js',
  applicationName: 'Robot Hub',
};

export const revalidate = 3600; // Revalidate at most every hour

/**
 * Parses and validates search parameters with proper typing
 */
function parseSearchParams(searchParams: SearchParams = {}): ParsedSearchParams {
  const {
    search,
    type,
    application,
    brand,
    min_price,
    max_price,
    sort_by = 'name',
    page = '1',
    per_page = '24',
  } = searchParams;

  // Helper to safely parse array parameters
  const parseArrayParam = (param: string | string[] | undefined): string[] | undefined => {
    if (!param) return undefined;
    if (Array.isArray(param)) return param.filter(Boolean);
    return [param].filter(Boolean);
  };

  // Helper to safely parse numeric parameters
  const parseNumericParam = (param: string | undefined): number | undefined => {
    if (!param) return undefined;
    const num = Number(param);
    return Number.isFinite(num) ? num : undefined;
  };

  // Parse page and per_page with validation
  const parsedPage = Math.max(1, parseInt(page, 10) || 1);
  const parsedPerPage = Math.min(100, Math.max(1, parseInt(per_page, 10) || 24));

  return {
    search: search?.trim() || undefined,
    type: parseArrayParam(type),
    application: parseArrayParam(application),
    brand: parseArrayParam(brand),
    min_price: parseNumericParam(min_price),
    max_price: parseNumericParam(max_price),
    sort_by: sort_by || 'name',
    page: parsedPage,
    per_page: parsedPerPage,
  } as const;
}

export default async function RobotsPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  // Parse and validate search parameters
  const {
    search,
    type,
    application,
    brand,
    min_price,
    max_price,
    sort_by,
    page,
    per_page,
  } = parseSearchParams(searchParams);

  // Prepare filters for the API with correct typing
  const filters = {
    search,
    type,
    application,
    brand,
    min_price: min_price,
    max_price: max_price,
    sort_by: sort_by as 'name' | 'price_asc' | 'price_desc' | 'payload' | 'reach',
  };

  try {
    // Fetch data in parallel
    const [robotsResponse, filterOptions] = await Promise.all([
      getRobots(filters, page, per_page),
      getFilterOptions(),
    ]);

    const { data: robots = [], count = 0 } = robotsResponse || {};
    const { types = [], applications = [], brands = [] } = filterOptions || {};
    
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 pb-12 pt-8 sm:pb-16">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
                Discover Robots
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Browse our comprehensive directory of industrial, commercial, and consumer robots.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <RobotFilters 
                  types={types} 
                  applications={applications} 
                  brands={brands} 
                  currentFilters={filters} 
                />
              </div>
            </div>

            {/* Robots Grid */}
            <div className="lg:col-span-3">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {count} {count === 1 ? 'Robot' : 'Robots'} Found
                  </h2>
                  {search && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Results for "{search}"
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700 dark:text-gray-300">View:</span>
                  <button className="p-2 rounded-md bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                <button className="p-2 rounded-md text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Robots Grid */}
            {robots.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {robots.map((robot) => (
                  <RobotCard key={robot.id} robot={robot} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No robots found</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  No robots match your search criteria. Try adjusting your filters.
                </p>
              </div>
            )}

            {/* Pagination */}
            {count > 24 && (
              <div className="mt-8 flex items-center justify-between border-t border-gray-200 dark:border-gray-800 px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                  <button
                    disabled={page <= 1}
                    className="relative inline-flex items-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    disabled={page * 24 >= count}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Showing <span className="font-medium">{(page - 1) * 24 + 1}</span> to{' '}
                      <span className="font-medium">{Math.min(page * 24, count)}</span> of{' '}
                      <span className="font-medium">{count}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                      <button
                        disabled={page <= 1}
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                      >
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                        </svg>
                      </button>
                      {/* Page numbers would go here */}
                      <button
                        disabled={page * 24 >= count}
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                      >
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  } catch (error) {
    console.error('Error fetching robots:', error);
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-6 py-12 text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
            Error loading robots
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Please try again later or contact support if the problem persists.
          </p>
        </div>
      </div>
    );
  }
}
