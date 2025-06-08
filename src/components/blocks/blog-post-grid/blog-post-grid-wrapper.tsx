import React from 'react';
import { BlogPostGrid, type BlogPostGridProperties } from './blog-post-grid';
import { render } from '../../../lib/render';
import { isComponentSpec } from '../../../types/schema/guards';
import type { ComponentSpec } from '../../../types/schema/components';

export interface BlogPostGridWrapperProps extends Omit<BlogPostGridProperties, 'sidebarContent'> {
  sidebarContent?: React.ReactNode | ComponentSpec;
  theme?: Record<string, unknown>;
  state?: Record<string, unknown>;
  handlers?: Record<string, (...args: unknown[]) => unknown>;
  parentContext?: Record<string, unknown>;
  spec?: ComponentSpec;
}

/**
 * Wrapper component for BlogPostGrid that handles rendering sidebarContent from ComponentSpec
 */
export function BlogPostGridWrapper({
  sidebarContent,
  theme,
  state,
  handlers,
  parentContext,
  spec,
  ...restProps
}: Readonly<BlogPostGridWrapperProps>) {
  // Render sidebarContent if it's a ComponentSpec
  const renderedSidebarContent = React.useMemo(() => {
    if (!sidebarContent) return undefined;
    
    if (isComponentSpec(sidebarContent)) {
      return render(sidebarContent, {
        theme,
        initialState: state,
        handlers,
      });
    }
    
    return sidebarContent;
  }, [sidebarContent, theme, state, handlers]);

  return <BlogPostGrid {...restProps} sidebarContent={renderedSidebarContent} />;
}