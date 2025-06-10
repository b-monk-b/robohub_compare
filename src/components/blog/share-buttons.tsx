'use client';

import { Facebook, Linkedin, Link as LinkIcon, Twitter } from 'lucide-react';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components';

interface ShareButtonsProps {
  title: string;
  url: string;
  className?: string;
}

export function ShareButtons({ title, url, className = '' }: ShareButtonsProps) {
  const shareData = {
    title,
    url,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // You might want to add a toast notification here
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareOnSocial = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };
    
    window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <span>Share</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => shareOnSocial('twitter')}>
              <Twitter className="mr-2 h-4 w-4" />
              <span>Twitter</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => shareOnSocial('facebook')}>
              <Facebook className="mr-2 h-4 w-4" />
              <span>Facebook</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => shareOnSocial('linkedin')}>
              <Linkedin className="mr-2 h-4 w-4" />
              <span>LinkedIn</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={copyToClipboard}>
              <LinkIcon className="mr-2 h-4 w-4" />
              <span>Copy link</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
