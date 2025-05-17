// TypeScript declaration for @testing-library/react exports
declare module '@testing-library/react' {
  export * from '@testing-library/dom';
  
  export interface RenderHookOptions<Props = unknown> {
    wrapper?: React.ComponentType<{ children: React.ReactNode }>;
    initialProps?: Props;
  }
  
  export function renderHook<
    Result,
    Props
  >(
    hook: (props: Props) => Result,
    options?: RenderHookOptions<Props>
  ): {
    result: { current: Result };
    rerender: (newProps?: Props) => void;
    unmount: () => void;
  };
  
  export const act: (fn: () => void | Promise<void>) => Promise<void>;
}