import { create } from 'zustand';

interface BreadCrumbValue {
  route: string;
  link: string;
}

interface BreadcrumbState {
  mainRoute: BreadCrumbValue;
  projectRoute: {
    project: BreadCrumbValue;
    task?: BreadCrumbValue;
    subTask?: BreadCrumbValue;
  };
}

interface BreadcrumbActions {
  actions: {
    setMainRoute: (pageName: string) => void;
    setProjectRoute: ({
      project,
      task,
      subTask,
    }: {
      project: string;
      task?: string;
      subTask?: string;
    }) => void;
    setProjectLink: ({
      projectId,
      taskId,
      subTaskId,
    }: {
      projectId: number;
      taskId?: number;
      subTaskId?: number;
    }) => void;
  };
}

const initialState: BreadcrumbState = {
  mainRoute: {
    route: '',
    link: '',
  },
  projectRoute: {
    project: {
      route: '',
      link: '',
    },
    task: {
      route: '',
      link: '',
    },
    subTask: {
      route: '',
      link: '',
    },
  },
};

const linkOfMainRoute: Record<string, string> = {
  프로젝트: '/projects/board',
  캘린더: '/calendars/day',
};

const useBreadCrumbStore = create<BreadcrumbState & BreadcrumbActions>(
  (set) => ({
    ...initialState,
    actions: {
      setMainRoute: (pageName) => {
        set(() => ({
          mainRoute: {
            route: pageName,
            link: linkOfMainRoute[pageName],
          },
        }));
      },
      setProjectRoute({ project, task = '', subTask = '' }) {
        set((state) => ({
          projectRoute: {
            project: {
              route: project,
              link: state.projectRoute.project.link,
            },
            task: {
              route: task,
              link: state.projectRoute.task?.link || '',
            },
            subTask: {
              route: subTask,
              link: state.projectRoute.subTask?.route || '',
            },
          },
        }));
      },
      setProjectLink: ({ projectId, taskId = 0, subTaskId = 0 }) => {
        set((state) => ({
          projectRoute: {
            project: {
              route: state.projectRoute.project.route,
              link: `/projects/${projectId}`,
            },
            task: {
              route: state.projectRoute.task?.route || '',
              link: `/projects/${projectId}/tasks/${taskId}`,
            },
            subTask: {
              route: state.projectRoute.subTask?.route || '',
              link: `/projects/${projectId}/subTasks/${subTaskId}`,
            },
          },
        }));
      },
    },
  }),
);

export const useBreadCrumbState = () => useBreadCrumbStore((state) => state);

export const useBreadCrumbActions = () => useBreadCrumbStore().actions;

export default useBreadCrumbStore;
