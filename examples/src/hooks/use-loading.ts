import { create } from "zustand";

interface LoadingStore {
  loadingStates: Record<string, boolean>;
  setLoading: (key: string, isLoading: boolean) => void;
  isLoading: (key: string) => boolean;
  isAnyLoading: () => boolean;
  clearLoading: (key: string) => void;
  clearAllLoading: () => void;
}

export const useLoadingStore = create<LoadingStore>((set, get) => ({
  loadingStates: {},

  setLoading: (key: string, isLoading: boolean) => {
    set((state) => ({
      loadingStates: {
        ...state.loadingStates,
        [key]: isLoading,
      },
    }));
  },

  isLoading: (key: string) => {
    return get().loadingStates[key] || false;
  },

  isAnyLoading: () => {
    return Object.values(get().loadingStates).some(Boolean);
  },

  clearLoading: (key: string) => {
    set((state) => {
      const newStates = { ...state.loadingStates };
      delete newStates[key];
      return { loadingStates: newStates };
    });
  },

  clearAllLoading: () => {
    set({ loadingStates: {} });
  },
}));

export function useLoading(key: string) {
  const { setLoading, isLoading, clearLoading } = useLoadingStore();

  return {
    loading: isLoading(key),
    setLoading: (isLoading: boolean) => setLoading(key, isLoading),
    clearLoading: () => clearLoading(key),
  };
}
