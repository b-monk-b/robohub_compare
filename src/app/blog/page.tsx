import { Metadata } from 'next';
import { getBlogPosts } from '@/lib/supabase/blog';
import { BlogCard } from '@/components/blog/blog-card';

export const metadata: Metadata = {
  title: 'Blog - Robot Hub',
  description: 'Latest news, articles, and insights about robotics and automation',
  openGraph: {
    title: 'Blog - Robot Hub',
    description: 'Latest news, articles, and insights about robotics and automation',
  },
};

export const revalidate = 3600; // Revalidate at most every hour

export default async function BlogPage() {
  const [featuredPost, ...otherPosts] = await getBlogPosts(7);
  const allPosts = [featuredPost, ...otherPosts];

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 pb-16 pt-8 sm:pb-24">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
              Robot Hub Blog
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Stay updated with the latest news, trends, and insights in robotics and automation.
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <a
                href="#featured"
                className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Featured Post
              </a>
              <a href="#latest" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                Latest Articles <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <section id="featured" className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Featured Article
          </h2>
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
            <BlogCard post={featuredPost} variant="featured" />
          </div>
        </section>
      )}

      {/* Latest Articles */}
      <section id="latest" className="bg-gray-50 py-16 dark:bg-gray-900/50 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Latest Articles
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Discover the latest insights and updates from the world of robotics
            </p>
          </div>
          
          {allPosts.length > 0 ? (
            <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {otherPosts.map((post) => (
                <BlogCard key={post.id} post={post} className="h-full" />
              ))}
            </div>
          ) : (
            <div className="mt-16 text-center">
              <p className="text-gray-500 dark:text-gray-400">No blog posts found. Check back later for updates!</p>
            </div>
          )}

          <div className="mt-16 flex justify-center">
            <a
              href="#"
              className="inline-flex items-center gap-x-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-gray-800 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-700"
            >
              Load more
              <svg className="-mr-0.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10.21 14.77a.75.75 0 01-1.06.02l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.832 10l2.378 2.7a.75.75 0 01.02 1.06zm.64-6.08a.75.75 0 01.02-1.06l3.5-3.25a.75.75 0 111.04 1.08L12.168 10l2.378 2.7a.75.75 0 11-1.06 1.06l-3.5-3.25a.75.75 0 01-.02-1.06l3.5-3.25-3.5 3.25z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-white py-16 dark:bg-gray-900 sm:py-24">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 text-center dark:from-gray-800 dark:to-gray-900 sm:p-12">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              Stay updated with our newsletter
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-600 dark:text-gray-300">
              Get the latest articles, news and resources sent straight to your inbox.
            </p>
            <form className="mt-8 sm:mx-auto sm:flex sm:max-w-lg">
              <div className="min-w-0 flex-1">
                <label htmlFor="cta-email" className="sr-only">Email address</label>
                <input
                  id="cta-email"
                  type="email"
                  className="block w-full rounded-md border-0 px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mt-4 sm:ml-3 sm:mt-0">
                <button
                  type="submit"
                  className="block w-full rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
