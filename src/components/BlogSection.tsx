import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  excerpt?: string;
  slug: string;
  created_at: string;
  tags?: string[];
  image_url?: string;
  author?: string;
}

export function BlogSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setBlogPosts(data || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Latest Insights & News</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">Stay updated with the latest news, trends, and insights from the world of robotics.</p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0">
              View all articles
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="h-full">
                <div className="animate-pulse">
                  <div className="h-48 bg-gray-200 dark:bg-gray-800" />
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
                    <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-full" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Format date to display month and day, year
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get category from tags (first tag)
  const getCategory = (post: BlogPost) => {
    if (post.tags && post.tags.length > 0) {
      return post.tags[0];
    }
    return 'Technology';
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Latest Insights & News</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Stay updated with the latest news, trends, and insights from the world of robotics.</p>
          </div>
          <Link href="/blog" passHref>
            <Button variant="outline" className="mt-4 md:mt-0">
              View all articles
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => {
            const category = getCategory(post);
            const formattedDate = formatDate(post.created_at);
            return (
              <Card key={post.id} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <div className="h-48 bg-gray-200 dark:bg-gray-800 overflow-hidden relative">
                  {post.image_url ? (
                    <>
                      <Image 
                        src={post.image_url} 
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 left-0 p-2 bg-white text-xs font-medium text-gray-600">
                        {category}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                        No image
                      </div>
                      <div className="absolute bottom-0 left-0 p-2 bg-white text-xs font-medium text-gray-600">
                        {category}
                      </div>
                    </>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {formattedDate}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt || 'No excerpt available.'}
                  </p>
                  <div className="mt-auto">
                    <Link href={`/blog/${post.slug}`} className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                      <span className="font-medium">Read Article</span>
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
