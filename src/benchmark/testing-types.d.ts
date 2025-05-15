declare module '@testing-library/react' {
  import { ReactElement } from 'react';

  // Type for render result
  export interface RenderResult {
    container: HTMLElement;
    unmount: () => void;
    rerender: (ui: ReactElement) => void;
    [key: string]: unknown;
  }

  // Override render to accept generic component types
  export function render<P = Record<string, unknown>, Q = Record<string, unknown>>(
    ui: ReactElement,
    options?: Q
  ): RenderResult;

  // Add cleanup function that is used in benchmarks
  export function cleanup(): void;
}