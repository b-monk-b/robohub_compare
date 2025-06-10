import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRobotBySlug, getRelatedRobots } from '@/lib/supabase/robots';
import { RobotCard } from '@/components/robots/robot-card';
import type { Metadata } from 'next';


export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const robot = await getRobotBySlug(resolvedParams.slug);

  if (!robot) {
    return {
      title: 'Robot Not Found',
      description: 'The requested robot could not be found',
    };
  }

  return {
    title: `${robot.name} | RoboHub`,
    description: robot.description,
    openGraph: {
      images: robot.image_url ? [{ url: robot.image_url }] : [],
    },
  };
}

export default async function RobotDetailPage({ params }: { params: { slug: string } }) {
  // Resolve params asynchronously
  const { slug } = await Promise.resolve(params);
  const robot = await getRobotBySlug(slug);
  if (!robot) notFound();

  const relatedRobots = await getRelatedRobots(robot.id, robot.type);

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-4">
              <li>
                <div className="flex">
                  <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    Home
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <Link
                    href="/robots"
                    className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    Robots
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {robot.name}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
              {robot.image_url ? (
                <Image
                  src={robot.image_url}
                  alt={robot.name}
                  fill
                  className="object-cover"
                  priority
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
            </div>
            
            {/* Gallery Thumbnails */}
            {robot.gallery_urls && robot.gallery_urls.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {robot.gallery_urls.map((url, index) => (
                  <div key={index} className="relative aspect-square overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={url}
                      alt={`${robot.name} - Image ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {robot.name}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-2xl tracking-tight text-gray-900 dark:text-white">
                {robot.price_range || 'Price on request'}
              </p>
            </div>

            {/* Brand and Type */}
            <div className="mt-4 flex items-center space-x-4">
              {robot.brand && (
                <div className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  {robot.brand}
                </div>
              )}
              {robot.type && (
                <div className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                  {robot.type}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="prose prose-sm text-gray-500 dark:prose-invert">
                {robot.description ? (
                  <p>{robot.description}</p>
                ) : (
                  <p>No description available for this robot.</p>
                )}
              </div>
            </div>

            {/* Key Features */}
            {robot.features && robot.features.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Key Features</h3>
                <ul role="list" className="mt-2 list-disc space-y-2 pl-5 text-sm">
                  {robot.features.map((feature, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Specifications</h3>
              <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                {robot.specifications?.payload_kg && (
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Payload</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {robot.specifications.payload_kg} kg
                    </dd>
                  </div>
                )}
                {robot.specifications?.reach_m && (
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Reach</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {robot.specifications.reach_m} m
                    </dd>
                  </div>
                )}
                {robot.specifications?.repeatability_mm && (
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Repeatability</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      ±{robot.specifications.repeatability_mm} mm
                    </dd>
                  </div>
                )}
                {robot.specifications?.axes && (
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Axes</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {robot.specifications.axes}
                    </dd>
                  </div>
                )}
                {robot.specifications?.weight_kg && (
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Weight</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {robot.specifications.weight_kg} kg
                    </dd>
                  </div>
                )}
                {robot.specifications?.ip_rating && (
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">IP Rating</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {robot.specifications.ip_rating}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Request Quote
              </button>
              <button
                type="button"
                className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
                Save
              </button>
              <button
                type="button"
                className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v2h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h2V4z" />
                </svg>
                Compare
              </button>
            </div>
          </div>
        </div>

        {/* Related Robots */}
        {relatedRobots.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">You may also like</h2>
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {relatedRobots.map((robot) => (
                <RobotCard key={robot.id} robot={robot} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
