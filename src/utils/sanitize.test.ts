import { describe, it, expect } from 'vitest';
import { sanitize } from './sanitize';

describe('sanitize', () => {
  it('should strip script tags', () => {
    const maliciousHtml = '<script>alert("XSS")</script><div>Safe content</div>';
    const sanitizedHtml = sanitize(maliciousHtml);
    expect(sanitizedHtml).not.toContain('<script>');
    expect(sanitizedHtml).toContain('Safe content');
  });

  it('should strip dangerous attributes like onclick', () => {
    const maliciousHtml = '<button onclick="alert(\'XSS\')">Click me</button>';
    const sanitizedHtml = sanitize(maliciousHtml);
    expect(sanitizedHtml).not.toContain('onclick');
    expect(sanitizedHtml).toContain('Click me');
  });

  it('should allow basic formatting tags', () => {
    const safeHtml = '<p><strong>Bold</strong> and <em>italic</em></p>';
    const sanitizedHtml = sanitize(safeHtml);
    expect(sanitizedHtml).toBe(safeHtml);
  });

  it('should allow images with basic attributes', () => {
    const imageHtml = '<img src="https://example.com/image.jpg" alt="Example Image" class="w-full" />';
    const sanitizedHtml = sanitize(imageHtml);
    expect(sanitizedHtml).toContain('src="https://example.com/image.jpg"');
    expect(sanitizedHtml).toContain('alt="Example Image"');
    expect(sanitizedHtml).toContain('class="w-full"');
  });

  it('should strip javascript: URIs in a tags', () => {
    const maliciousLink = '<a href="javascript:alert(1)">Click me</a>';
    const sanitizedHtml = sanitize(maliciousLink);
    expect(sanitizedHtml).not.toContain('href="javascript');
  });

  it('should allow iframes from youtube', () => {
    const iframeHtml = '<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" width="560" height="315" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen title="Youtube Video"></iframe>';
    const sanitizedHtml = sanitize(iframeHtml);
    expect(sanitizedHtml).toContain('<iframe');
    expect(sanitizedHtml).toContain('src="https://www.youtube.com/embed/dQw4w9WgXcQ"');
  });

  it('should strip iframes src from untrusted domains', () => {
    const maliciousIframeHtml = '<iframe src="https://malicious.com/exploit.html"></iframe>';
    const sanitizedHtml = sanitize(maliciousIframeHtml);
    expect(sanitizedHtml).not.toContain('src="https://malicious.com');
  });
});
