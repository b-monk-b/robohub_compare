import Link from 'next/link';
import { getBlogPosts, type BlogPost } from '@/lib/supabase/blog';
import { formatDate } from '@/lib/utils/date';

const BlogSection = async () => {
  let recentPosts: BlogPost[] = [];
  let error: string | null = null;

  try {
    // Get the 3 most recent blog posts
    const posts = await getBlogPosts(3);
    if (Array.isArray(posts)) {
      recentPosts = posts;
    } else {
      console.error('Expected an array of posts but got:', posts);
      error = 'Failed to load blog posts';
    }
  } catch (err) {
    console.error('Error fetching blog posts:', err);
    error = 'Error loading blog posts. Please try again later.';
  }

  // If there's an error, don't render the section at all
  if (error) {
    console.warn('Not rendering BlogSection due to error:', error);
    return null;
  }

  // If no posts are available, don't render the section
  if (!recentPosts || recentPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <span className="text-blue-600 text-sm font-semibold tracking-wide uppercase">OUR BLOG</span>
            <h2 className="mt-1 text-3xl font-extrabold text-gray-900 dark:text-white">Latest Insights & News</h2>
            <div className="w-20 h-1 bg-blue-600 mt-2"></div>
            <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
              Stay updated with the latest trends and insights in the robotics industry.
            </p>
          </div>
          <Link 
            href="/blog" 
            className="mt-4 md:mt-0 inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
          >
            View all articles
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <article key={post.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                {post.image_url ? (
                  <img 
                    src={post.image_url} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 dark:text-gray-600 text-center p-4">
                    [Blog Image]
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <span className="text-xs font-medium text-white px-2 py-1 bg-blue-600 rounded">
                    {post.tags?.[0] || 'Robotics'}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <time 
                  dateTime={post.created_at}
                  className="block text-sm text-gray-500 dark:text-gray-400 mb-2"
                >
                  {formatDate(post.created_at)}
                </time>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {post.excerpt || post.content?.substring(0, 150) + '...' || 'Read more about this article...'}
                </p>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors text-sm"
                >
                  Read Article
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
