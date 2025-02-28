import { create } from 'zustand';

interface BreadcrumbState {
  mainRoute: string;
  projectRoute: {
    project: string;
    task?: string;
    subTask?: string;
  };
}

interface BreadcrumbActions {
  actions: {
    setMainRoute: (pageName: string) => void;
    setProjectRoute: ({
      project,
      task,
      subTask,
    }: BreadcrumbState['projectRoute']) => void;
  };
}

const initialState: BreadcrumbState = {
  mainRoute: '',
  projectRoute: {
    project: '',
    task: '',
    subTask: '',
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
      setProjectRoute({ project, task = '', subTask = '' }) {
        set(() => ({
          projectRoute: {
            project,
            task,
            subTask,
          },
        }));
      },
    },
  }),
);

export const useBreadCrumbState = () => useBreadCrumbStore((state) => state);

export const useBreadCrumbActions = () => useBreadCrumbStore().actions;

export default useBreadCrumbStore;
