import Image from 'next/image';
import Link from 'next/link';
import { formatDate, cn } from '@/lib/utils';
import { BlogPost } from '@/lib/supabase/blog';

interface BlogCardProps {
  post: BlogPost;
  className?: string;
  variant?: 'default' | 'featured';
}

export function BlogCard({ post, className, variant = 'default' }: BlogCardProps) {
  return (
    <article className={cn(
      'group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900',
      variant === 'featured' ? 'lg:col-span-2' : '',
      className
    )}>
      <div className={cn(
        'relative overflow-hidden',
        variant === 'featured' ? 'h-80' : 'h-48'
      )}>
        {post.image_url ? (
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            sizes={variant === 'featured' ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
            priority={false}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
            <span className="text-gray-400 dark:text-gray-600">No image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags?.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link href={`/blog/${post.slug}`} className="block flex-1">
          <h3 className={cn(
            'mb-3 font-sans font-bold leading-tight text-gray-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400',
            variant === 'featured' ? 'text-2xl' : 'text-xl'
          )}>
            {post.title}
          </h3>
          <p className="mb-4 text-gray-600 line-clamp-3 dark:text-gray-300">
            {post.excerpt}
          </p>
        </Link>
        <div className="mt-auto flex items-center pt-4">
          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div className="flex h-full items-center justify-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {post.author || 'Robot Hub Team'}
            </p>
            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={post.created_at}>
                {formatDate(post.created_at)}
              </time>
              <span>•</span>
              <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}


