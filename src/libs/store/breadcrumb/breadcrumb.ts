import { create } from 'zustand';

interface BreadcrumbState {
  mainRoute: string;
  projectRoute: string;
  taskRoute: {
    task: string;
  };
}

interface BreadcrumbActions {
  actions: {
    setMainRoute: (pageName: string) => void;
    setProjectRoute: (title: string) => void;
  };
}

const initialState: BreadcrumbState = {
  mainRoute: '',
  projectRoute: '',
  taskRoute: {
    task: '',
  },
};

const useBreadCrumbStore = create<BreadcrumbState & BreadcrumbActions>(
  (set) => ({
    ...initialState,
    actions: {
      setMainRoute: (pageName) => {
        set(() => ({
          mainRoute: pageName,
        }));
      },
      setProjectRoute(title) {
        set(() => ({
          projectRoute: title,
        }));
      },
    },
  }),
);

export const useBreadCrumbState = () => useBreadCrumbStore((state) => state);

export const useBreadCrumbActions = () => useBreadCrumbStore().actions;

export default useBreadCrumbStore;
