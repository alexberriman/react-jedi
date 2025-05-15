/**
 * React Jedi - Main Entry Point
 * 
 * This file exports everything from the library.
 */

import type { ComponentResolver, RenderOptions, UISpecification, ComponentSpec } from "./types/schema/components";
import { render } from "./lib/render";
import { defaultComponentResolver } from "./lib/component-resolver";
import { buildComponentTree } from "./lib/component-tree";

// Version information
export const VERSION = "1.0.0";

/**
 * React Jedi initialization options
 */
export interface JediOptions {
  /**
   * Custom component resolver
   */
  resolver?: ComponentResolver;
  
  /**
   * Default theme configuration
   */
  theme?: Record<string, unknown>;
  
  /**
   * Whether to enable development mode with additional debugging
   * @default false
   */
  development?: boolean;
  
  /**
   * Custom event handlers
   */
  handlers?: Record<string, (...args: unknown[]) => void>;
}

/**
 * React Jedi instance
 */
export interface Jedi {
  /**
   * Library version
   */
  version: string;
  
  /**
   * Render a UI specification or component specification
   */
  render: (spec: UISpecification | ComponentSpec, options?: RenderOptions) => React.ReactElement | null;
  
  /**
   * Build a component tree from a specification
   */
  buildTree: (spec: UISpecification | ComponentSpec) => ReturnType<typeof buildComponentTree>;
  
  /**
   * Default options for this instance
   */
  options: Required<JediOptions>;
}

/**
 * Create a React Jedi instance
 * 
 * @param options Initialization options
 * @returns Jedi instance
 */
export function createJedi(options: JediOptions = {}): Jedi {
  const defaultOptions: Required<JediOptions> = {
    resolver: defaultComponentResolver,
    theme: {},
    development: false,
    handlers: {},
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  return {
    version: VERSION,
    
    render: (spec, renderOptions = {}) => {
      // Merge instance options with render-specific options
      const mergedRenderOptions = {
        resolver: mergedOptions.resolver,
        theme: mergedOptions.theme,
        development: mergedOptions.development,
        handlers: mergedOptions.handlers,
        ...renderOptions,
      };
      
      return render(spec, mergedRenderOptions);
    },
    
    buildTree: (spec) => buildComponentTree(spec),
    
    options: mergedOptions,
  };
}

// Export all components through the barrel file
export * from "./components/index";

// Export utilities
export * from "./lib/index";

// Export UI components
export * from "./components/ui/index";

// Export schemas
export * from "./lib/schemas/index";

// Export types
export * from "./types/index";

// Export hooks if available
// export * from "./hooks/index";