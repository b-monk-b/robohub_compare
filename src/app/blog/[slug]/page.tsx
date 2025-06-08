'use client';

import { notFound, useParams } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage, Button, BlogCard, ShareButtons, TableOfContents } from '@/components';
import { ArrowLeft, Share2, Clock, Calendar, Tag, User } from 'lucide-react';
import Link from 'next/link';
import { parseMarkdown } from '@/lib/utils/markdown';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/supabase/blog';
import Image from 'next/image';
import { BlogPost } from '@/lib/supabase/blog';

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [parsedContent, setParsedContent] = useState<{ html: string; toc: any[] }>({ html: '', toc: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);

  // Parse markdown content when post changes
  useEffect(() => {
    const parseContent = async () => {
      if (!post?.content) {
        setParsedContent({ html: '', toc: [] });
        setIsParsing(false);
        return;
      }

      try {
        setIsParsing(true);
        setParseError(null);
        const result = await parseMarkdown(post.content);
        setParsedContent(result);
      } catch (error) {
        console.error('Error parsing markdown:', error);
        setParseError('Failed to parse blog post content');
        setParsedContent({ html: post.content, toc: [] });
      } finally {
        setIsParsing(false);
      }
    };

    parseContent();
  }, [post?.content]);

  // Fetch blog post data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const postData = await getBlogPostBySlug(params.slug as string);
        
        if (!postData) {
          notFound();
          return;
        }
        
        setPost(postData);
        
        // Fetch related posts
        if (postData.tags && postData.tags.length > 0) {
          try {
            const related = await getRelatedBlogPosts(postData.id, postData.tags);
            setRelatedPosts(related);
          } catch (err) {
            console.error('Error fetching related posts:', err);
            setRelatedPosts([]);
          }
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load the blog post. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
    
    // Cleanup function
    return () => {
      // Cancel any ongoing requests if needed
    };
  }, [params.slug]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="rounded-lg bg-red-50 p-6 dark:bg-red-900/20">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error loading blog post</h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <Link href="/blog" className="text-sm font-medium text-red-700 underline hover:text-red-600 dark:text-red-300 dark:hover:text-red-400">
                  Back to blog posts <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    notFound();
    return null;
  }

  const hasToc = parsedContent?.toc?.length > 0;
  const hasContent = parsedContent?.html?.trim().length > 0;

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Article Header */}
      <div className="relative bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 pb-12 pt-8 sm:pb-16">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] dark:opacity-10" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="group mb-6 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to blog
            </Link>

            <h1 className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent dark:from-blue-400 dark:to-indigo-300 sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              {post.excerpt}
            </p>

            <div className="mt-6 flex flex-col items-start justify-between border-t border-gray-200 pt-6 dark:border-gray-800 sm:flex-row sm:items-center">
              <div className="flex items-center">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <Avatar>
                    <AvatarImage src="https://example.com/avatar.jpg" alt="Author Avatar" />
                    <AvatarFallback>
                      <User className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {post.author || 'Robot Hub Team'}
                  </p>
                  <div className="flex space-x-1 text-sm text-gray-500 dark:text-gray-400">
                    <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
                    <span>•</span>
                    <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
                  </div>
                </div>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 sm:mt-0">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="relative mx-auto max-w-7xl px-6 lg:flex lg:px-8">
        {/* Table of Contents */}
        {hasToc && (
          <div className="hidden lg:sticky lg:top-24 lg:mr-8 lg:block lg:h-[calc(100vh-6rem)] lg:flex-shrink-0 lg:overflow-y-auto lg:py-8 lg:pr-4">
            <div className="w-64">
              <TableOfContents items={parsedContent.toc} className="sticky top-6 hidden lg:block" />
            </div>
          </div>
        )}

        <div className="relative mx-auto max-w-3xl">
          <article className="prose prose-lg prose-blue mx-auto max-w-none dark:prose-invert lg:prose-xl">
            {post.image_url && (
              <div className="relative -mx-6 mb-12 h-64 overflow-hidden rounded-lg shadow-lg sm:mx-0 sm:h-96">
                <Image
                  src={post.image_url}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  priority
                />
              </div>
            )}

            {isParsing ? (
              <div className="flex min-h-[200px] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
              </div>
            ) : parseError ? (
              <div className="rounded-lg bg-red-50 p-6 dark:bg-red-900/20">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error loading content</h3>
                    <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                      <p>{parseError}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : hasContent ? (
              <div className="prose prose-lg prose-blue mx-auto max-w-none dark:prose-invert lg:prose-xl">
                <div
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: parsedContent.html }}
                />
              </div>
            ) : (
              <div className="rounded-lg bg-yellow-50 p-6 dark:bg-yellow-900/20">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">No content available</h3>
                    <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                      <p>This blog post doesn't have any content yet. Please check back later.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>Published on {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  {post.updated_at !== post.created_at && (
                    <>
                      <span>•</span>
                      <span>Updated on {new Date(post.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </>
                  )}
                </div>
                <ShareButtons title={post.title} url={`https://robo-hub.vercel.app/blog/${post.slug}`} />
              </div>
            </div>
          </article>

          {/* Author Bio */}
          <div className="mt-12 rounded-2xl bg-gray-50 p-8 dark:bg-gray-800/50">
            <div className="flex items-center">
              <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div className="flex h-full items-center justify-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="ml-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {post.author || 'Robot Hub Team'}
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  {post.author_bio || 'Contributor at Robot Hub, sharing insights about robotics and automation.'}
                </p>
                <div className="mt-2 flex space-x-4">
                  <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <span className="sr-only">GitHub</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 flex items-center justify-between border-t border-b border-gray-200 py-6 dark:border-gray-800">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Previous</p>
              <a href="#" className="mt-1 block font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                &larr; The Future of Industrial Automation
              </a>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Next</p>
              <a href="#" className="mt-1 block font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                Robotics in Healthcare: The Next Frontier &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      <div className="bg-gray-50 py-16 dark:bg-gray-900/50 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              You might also like
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
              More articles about robotics and automation
            </p>
          </div>
          <div className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              {relatedPosts.length > 0 ? 'Related Posts' : 'More Posts'}
            </h2>
            
            {relatedPosts.length > 0 ? (
              <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-lg bg-gray-50 p-6 text-center dark:bg-gray-800/50">
                <p className="text-gray-600 dark:text-gray-400">
                  No related posts found. Check out our other blog posts below.
                </p>
                <div className="mt-4">
                  <Link 
                    href="/blog" 
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    View all posts
                    <svg className="ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            )}
            
            <div className="mt-8 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-600"
              >
                View all blog posts
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-white py-16 dark:bg-gray-950 sm:py-24">
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
                  className="block w-full rounded-md border-0 px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:bg-white/10 dark:text-white dark:placeholder-gray-400"
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
      </div>
    </div>
  );
}
