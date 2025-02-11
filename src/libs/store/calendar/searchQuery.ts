import { create } from 'zustand';

interface SearchQueryState {
  searchQuery: string;
}

interface SearchQueryActions {
  actions: {
    setSearchQuery: (query: string) => void;
    clearSearchQuery: () => void;
  };
}

const initialState: SearchQueryState = {
  searchQuery: '',
};

const useSearchQueryStore = create<SearchQueryState & SearchQueryActions>(
  (set) => ({
    ...initialState,
    actions: {
      setSearchQuery: (query) => {
        set(() => ({
          searchQuery: query,
        }));
      },
      clearSearchQuery: () => {
        set(() => ({
          searchQuery: '',
        }));
      },
    },
  }),
);

export const useSearchQueryState = () => useSearchQueryStore((state) => state);

export const useSearchQueryActions = () => useSearchQueryStore().actions;

export default useSearchQueryStore;
