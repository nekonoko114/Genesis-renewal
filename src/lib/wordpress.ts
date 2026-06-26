export interface WordPressRendered {
  rendered: string;
}

export interface WordPressPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  link: string;
  title: WordPressRendered;
  excerpt: WordPressRendered;
  content: WordPressRendered;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url?: string;
      alt_text?: string;
      media_details?: {
        sizes?: Record<string, { source_url: string }>;
      };
    }>;
  };
}

interface GetPostsOptions {
  page?: number;
  perPage?: number;
}

const API_URL = normalizeApiUrl(
  import.meta.env.WORDPRESS_API_URL || import.meta.env.PUBLIC_WORDPRESS_API_URL || 'https://genesis-llc.co.jp'
);

function normalizeApiUrl(url?: string) {
  if (!url) return '';
  return url.replace(/\/$/, '').replace(/\/wp-json\/wp\/v2$/, '');
}

function endpoint(path: string, params: Record<string, string | number> = {}) {
  const url = new URL(`${API_URL}/wp-json/wp/v2/${path}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });
  return url;
}

async function fetchWp<T>(path: string, params: Record<string, string | number> = {}): Promise<T | null> {
  if (!API_URL) return null;

  try {
    const response = await fetch(endpoint(path, params));
    if (!response.ok) {
      console.warn(`WordPress API request failed: ${response.status} ${response.statusText}`);
      return null;
    }
    return await response.json() as T;
  } catch (error) {
    console.warn('WordPress API request failed:', error);
    return null;
  }
}

export async function getPosts({ page = 1, perPage = 6 }: GetPostsOptions = {}) {
  const posts = await fetchWp<WordPressPost[]>('posts', {
    _embed: 1,
    page,
    per_page: perPage,
  });

  return posts ?? [];
}

export async function getPostBySlug(slug: string) {
  const posts = await fetchWp<WordPressPost[]>('posts', {
    _embed: 1,
    slug,
    per_page: 1,
  });

  return posts?.[0] ?? null;
}

export function getFeaturedImage(post: WordPressPost) {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  return {
    src: media?.media_details?.sizes?.large?.source_url || media?.source_url || '',
    alt: media?.alt_text || plainText(post.title.rendered),
  };
}

export function plainText(html = '') {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&hellip;/g, '...')
    .trim();
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date));
}
