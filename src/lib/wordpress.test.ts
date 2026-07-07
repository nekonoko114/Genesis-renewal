import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getPosts,
  getPostBySlug,
  getFeaturedImage,
  plainText,
  formatPostDate,
  type WordPressPost
} from './wordpress';

const mockPost: WordPressPost = {
  id: 1,
  slug: 'test-post',
  date: '2023-01-01T12:00:00',
  modified: '2023-01-02T12:00:00',
  link: 'https://example.com/test-post',
  title: { rendered: 'Test Post Title' },
  excerpt: { rendered: '<p>Test excerpt</p>' },
  content: { rendered: '<p>Test content</p>' },
  _embedded: {
    'wp:featuredmedia': [
      {
        source_url: 'https://example.com/image.jpg',
        alt_text: 'Test Alt Text',
        media_details: {
          sizes: {
            large: { source_url: 'https://example.com/large-image.jpg' }
          }
        }
      }
    ]
  }
};

describe('wordpress.ts', () => {
  describe('API Functions', () => {
    let fetchMock: any;

    beforeEach(() => {
      fetchMock = vi.fn();
      vi.stubGlobal('fetch', fetchMock);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    describe('getPosts', () => {
      it('should fetch posts with default options', async () => {
        fetchMock.mockResolvedValue({
          ok: true,
          json: async () => [mockPost]
        });

        const posts = await getPosts();

        expect(posts).toHaveLength(1);
        expect(posts[0]).toEqual(mockPost);
        expect(fetchMock).toHaveBeenCalledWith(
          expect.objectContaining({
            href: expect.stringContaining('page=1'),
            href: expect.stringContaining('per_page=6')
          })
        );
      });

      it('should fetch posts with custom options', async () => {
        fetchMock.mockResolvedValue({
          ok: true,
          json: async () => [mockPost, mockPost]
        });

        const posts = await getPosts({ page: 2, perPage: 10 });

        expect(posts).toHaveLength(2);
        expect(fetchMock).toHaveBeenCalledWith(
          expect.objectContaining({
            href: expect.stringContaining('page=2'),
            href: expect.stringContaining('per_page=10')
          })
        );
      });

      it('should return empty array on fetch failure', async () => {
        fetchMock.mockResolvedValue({
          ok: false,
          status: 500,
          statusText: 'Internal Server Error'
        });

        const posts = await getPosts();

        expect(posts).toEqual([]);
      });

      it('should return empty array on network error', async () => {
        fetchMock.mockRejectedValue(new Error('Network error'));

        const posts = await getPosts();

        expect(posts).toEqual([]);
      });
    });

    describe('getPostBySlug', () => {
      it('should fetch a specific post by slug', async () => {
        fetchMock.mockResolvedValue({
          ok: true,
          json: async () => [mockPost]
        });

        const post = await getPostBySlug('test-post');

        expect(post).toEqual(mockPost);
        expect(fetchMock).toHaveBeenCalledWith(
          expect.objectContaining({
            href: expect.stringContaining('slug=test-post'),
            href: expect.stringContaining('per_page=1')
          })
        );
      });

      it('should return null if post is not found', async () => {
        fetchMock.mockResolvedValue({
          ok: true,
          json: async () => []
        });

        const post = await getPostBySlug('non-existent-post');

        expect(post).toBeNull();
      });

      it('should return null on fetch failure', async () => {
        fetchMock.mockResolvedValue({
          ok: false,
          status: 404,
          statusText: 'Not Found'
        });

        const post = await getPostBySlug('test-post');

        expect(post).toBeNull();
      });
    });
  });

  describe('Helper Functions', () => {
    describe('getFeaturedImage', () => {
      it('should return large image if available', () => {
        const image = getFeaturedImage(mockPost);
        expect(image.src).toBe('https://example.com/large-image.jpg');
        expect(image.alt).toBe('Test Alt Text');
      });

      it('should fallback to source_url if large image is missing', () => {
        const postWithoutLargeImage = {
          ...mockPost,
          _embedded: {
            'wp:featuredmedia': [
              {
                source_url: 'https://example.com/image.jpg',
                alt_text: 'Test Alt Text'
              }
            ]
          }
        };

        const image = getFeaturedImage(postWithoutLargeImage);
        expect(image.src).toBe('https://example.com/image.jpg');
      });

      it('should fallback to post title for alt text if alt_text is missing', () => {
        const postWithoutAltText = {
          ...mockPost,
          _embedded: {
            'wp:featuredmedia': [
              {
                source_url: 'https://example.com/image.jpg',
              }
            ]
          }
        };

        const image = getFeaturedImage(postWithoutAltText);
        expect(image.alt).toBe('Test Post Title');
      });

      it('should handle completely missing image data gracefully', () => {
        const postWithoutImage = { ...mockPost };
        delete postWithoutImage._embedded;

        const image = getFeaturedImage(postWithoutImage);
        expect(image.src).toBe('');
        expect(image.alt).toBe('Test Post Title');
      });
    });

    describe('plainText', () => {
      it('should strip HTML tags', () => {
        expect(plainText('<p>Hello <b>World</b></p>')).toBe('Hello World');
      });

      it('should replace common HTML entities', () => {
        expect(plainText('Hello&nbsp;World')).toBe('Hello World');
        expect(plainText('Tom &amp; Jerry')).toBe('Tom & Jerry');
        expect(plainText('&lt;div&gt;')).toBe('<div>');
        expect(plainText('It&#8217;s time')).toBe("It's time");
        expect(plainText('&#8220;Quote&#8221;')).toBe('"Quote"');
        expect(plainText('Wait&hellip;')).toBe('Wait...');
      });

      it('should handle empty string', () => {
        expect(plainText()).toBe('');
      });

      it('should trim whitespace', () => {
        expect(plainText('  <p>  Text  </p>  ')).toBe('Text');
      });
    });

    describe('formatPostDate', () => {
      it('should format date in ja-JP locale correctly', () => {
        const formatted = formatPostDate('2023-01-05T12:30:00');
        expect(formatted).toBe('2023/01/05');
      });

      it('should handle different date formats', () => {
        const formatted = formatPostDate('2023-11-25');
        expect(formatted).toBe('2023/11/25');
      });
    });
  });
});
