import { supabase } from './client';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  image_url?: string;
  author?: string;
  author_bio?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export async function getBlogPosts(limit = 10, offset = 0): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return data || [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }

  return data;
}

export async function getRelatedBlogPosts(
  currentPostId: string,
  tags: string[] = [],
  limit = 3
): Promise<BlogPost[]> {
  if (tags.length === 0) {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .neq('id', currentPostId)
      .order('created_at', { ascending: false })
      .limit(limit);
    return data || [];
  }

  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .neq('id', currentPostId)
    .contains('tags', tags)
    .order('created_at', { ascending: false })
    .limit(limit);

  return data || [];
}
