import { describe, it, expect, vi } from 'vitest';
import { render as testRender } from '@testing-library/react';
import { BlogPostGrid } from './blog-post-grid';
import { render } from '../../../lib/render';

describe('BlogPostGrid', () => {
  const mockPosts = [
    {
      id: '1',
      title: 'Test Post 1',
      excerpt: 'Test excerpt 1',
      category: 'Technology',
      author: { name: 'John Doe' },
      publishDate: '2024-01-01',
      readTime: 5,
      slug: 'test-post-1',
    },
    {
      id: '2',
      title: 'Test Post 2',
      excerpt: 'Test excerpt 2',
      category: 'Design',
      author: { name: 'Jane Smith' },
      publishDate: '2024-01-02',
      readTime: 3,
      slug: 'test-post-2',
    },
  ];

  it('should render posts correctly', () => {
    const { container } = testRender(<BlogPostGrid posts={mockPosts} />);
    expect(container.querySelector('.grid')).toBeTruthy();
    expect(container.textContent).toContain('Test Post 1');
    expect(container.textContent).toContain('Test Post 2');
  });

  it('should render correctly in SDUI mode', () => {
    const spec = {
      type: 'BlogPostGrid',
      posts: mockPosts,
      variant: 'cards',
      showFilters: true,
      showSearch: true,
    };

    const { container } = testRender(<>{render(spec)}</>);
    expect(container.querySelector('.grid')).toBeTruthy();
    expect(container.textContent).toContain('Test Post 1');
  });

  it('should not render functions as React children', () => {
    // Spy on console.error to catch React warnings
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    testRender(<BlogPostGrid posts={mockPosts} />);
    
    // Check that no console errors were logged about invalid React children
    const invalidChildErrors = consoleSpy.mock.calls.filter(call => 
      call[0]?.toString().includes('Objects are not valid as a React child')
    );
    
    expect(invalidChildErrors.length).toBe(0);
    
    consoleSpy.mockRestore();
  });

  it('should handle empty posts array', () => {
    const { container } = testRender(<BlogPostGrid posts={[]} />);
    expect(container.textContent).toContain('No posts found');
  });

  it('should handle loading state', () => {
    const { container } = testRender(<BlogPostGrid posts={[]} loading={true} />);
    // Look for skeleton elements by data-slot attribute
    const skeleton = container.querySelector('[data-slot="skeleton"]');
    expect(skeleton).toBeTruthy();
  });
});