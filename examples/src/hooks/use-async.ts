import { useState, useCallback, useEffect } from "react";

interface AsyncState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

interface UseAsyncOptions {
  immediate?: boolean;
}

export function useAsync<T>(asyncFunction: () => Promise<T>, options: UseAsyncOptions = {}) {
  const { immediate = true } = options;

  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    loading: immediate,
  });

  const execute = useCallback(async () => {
    setState({ data: null, error: null, loading: true });

    try {
      const result = await asyncFunction();
      setState({ data: result, error: null, loading: false });
      return result;
    } catch (error) {
      const errorObject = error instanceof Error ? error : new Error(String(error));
      setState({ data: null, error: errorObject, loading: false });
      throw errorObject;
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { ...state, execute };
}
