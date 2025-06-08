'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface TableOfContentsProps {
  items: {
    id: string;
    title: string;
    level: number;
  }[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%', threshold: 0.1 }
    );

    // Observe all headings
    const headingElements = items.map(({ id }) => document.getElementById(id));
    headingElements.forEach((elem) => {
      if (elem) observer.observe(elem);
    });

    return () => {
      headingElements.forEach((elem) => {
        if (elem) observer.unobserve(elem);
      });
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div className={cn('space-y-2', className)}>
      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">On this page</h3>
      <nav className="mt-2 space-y-1">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              'block text-sm transition-colors hover:text-blue-600 dark:hover:text-blue-400',
              activeId === item.id
                ? 'font-medium text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400',
              {
                'pl-4': item.level === 3,
                'pl-8': item.level === 4,
              }
            )}
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById(item.id);
              if (element) {
                const headerOffset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth',
                });

                // Update URL without page reload
                window.history.pushState({}, '', `#${item.id}`);
              }
            }}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  );
}
