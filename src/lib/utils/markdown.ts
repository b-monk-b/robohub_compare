import { marked } from 'marked';

// Configure marked to use async mode
marked.use({
  async: true,
  gfm: true,
  breaks: true,
  // We handle heading IDs ourselves in addHeadingIds
});

interface Heading {
  id: string;
  title: string;
  level: number;
}

/**
 * Generate a slug from a string
 */
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\\s+/g, '-')
    .replace(/[^\\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Generate a table of contents from markdown content
 */
export function generateTableOfContents(markdown: string): Heading[] {
  const headings: Heading[] = [];
  const tokens = marked.lexer(markdown);

  const processTokens = (tokens: any[]) => {
    for (const token of tokens) {
      if (token.type === 'heading' && token.depth >= 2 && token.depth <= 4) {
        const text = token.text;
        const id = slugify(text);
        headings.push({
          id,
          title: text,
          level: token.depth,
        });
      }

      if (token.tokens) {
        processTokens(token.tokens);
      }
    }
  };

  processTokens(tokens);
  return headings;
}

/**
 * Add IDs to headings in HTML content
 * This is a simplified version that works in the browser
 */
export function addHeadingIds(html: string): string {
  // Create a temporary div to parse the HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // Add IDs to headings
  const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headings.forEach((heading) => {
    const text = heading.textContent || '';
    const id = slugify(text);
    heading.id = id;
  });

  return tempDiv.innerHTML;
}

/**
 * Parse markdown to HTML with added features
 */
export async function parseMarkdown(markdown: string): Promise<{ html: string; toc: Heading[] }> {
  try {
    // Generate table of contents first
    const toc = generateTableOfContents(markdown);

    // Parse markdown to HTML (await the promise)
    const html = await marked.parse(markdown);

    // Add IDs to headings
    let htmlWithIds = html;
    
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      htmlWithIds = addHeadingIds(html);
    }

    return {
      html: htmlWithIds,
      toc,
    };
  } catch (error) {
    console.error('Error parsing markdown:', error);
    return {
      html: markdown, // Return raw markdown as fallback
      toc: [],
    };
  }
}
