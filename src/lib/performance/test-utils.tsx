import React from "react";
import { render } from "@testing-library/react";

// Custom renderHook implementation for React 18+
interface RenderHookOptions<TProps> {
  initialProps?: TProps;
}

interface RenderHookResult<TResult, TProps> {
  result: React.MutableRefObject<TResult>;
  rerender: (props?: TProps) => void;
  unmount: () => void;
}

export function renderHook<TResult, TProps = Record<string, unknown>>(
  hook: (props: TProps) => TResult,
  options?: RenderHookOptions<TProps>
): RenderHookResult<TResult, TProps> {
  const resultRef = React.createRef<TResult>() as React.MutableRefObject<TResult>;
  
  const TestComponent = ({ hookProps }: { hookProps: TProps }) => {
    const hookResult = hook(hookProps);
    resultRef.current = hookResult;
    return null;
  };

  const { rerender: rtlRerender, unmount } = render(
    <TestComponent hookProps={options?.initialProps || ({} as TProps)} />
  );

  return {
    result: resultRef,
    rerender: (props?: TProps) => {
      rtlRerender(<TestComponent hookProps={props || options?.initialProps || ({} as TProps)} />);
    },
    unmount,
  };
}