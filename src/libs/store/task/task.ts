import { IMember } from '@customTypes/member';
import { IProject, RawProject } from '@customTypes/project';
import { RawTask } from '@customTypes/task';
import { create } from 'zustand';

interface ITask {
  description?: string;
  endDate?: Date;
  startDate?: Date;
  title: string;
  thumbnailIcon?: string;
  /**
   * 상위 업무 아이디
   * null == 프로젝트 최상위 업무
   * 1 : 서브 테스크
   * 2: 퀘스트
   */
  parentTaskId?: number;
  projectId: number;
  /**
   * 업무 상태 ( 0: 진행중, 1: 완료, 2: 해야할 일)
   */
  status: number;
  taskManagers?: IMember[];
}

// 업무 생성 State
type TaskState = {
  payload: ITask;
  project: IProject;
  errorList: string[];
  taskId: number;
  titleImage: string | undefined;
  images: File[];
};
type TaskActions = {
  actions: {
    setTaskId: (taskId: number) => void;
    // 업무 state 변경
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    setStartDate: (date: Date) => void;
    setEndDate: (date: Date) => void;
    setParentTaskId: (parentTaskId: number) => void;
    setProjectId: (projectId: number) => void;
    setStatus: (status: number) => void;
    // setTaskManagers: (setType: 'add' | 'sub', member: IMember) => void;
    setTaskManagers: () => void;
    setImages: (image: File) => void;

    // titleImage
    setTitleImage: (titleImage: string | undefined) => void;

    // reset
    resetPayload: () => void;

    // edit
    setEditTask: (task: RawTask) => void;

    // project
    setProject: (project: RawProject) => void;

    // errorList
    setErrorList: (errorList: string) => void;

    // removeErrorList

    removeErrorList: (errorList: string) => void;

    // clearErrorList
    clearErrorList: () => void;
  };
};

const initialState: TaskState = {
  titleImage: undefined,
  images: [],
  taskId: 0,
  payload: {
    title: '',
    description: '',
    startDate: undefined,
    endDate: undefined,
    parentTaskId: 0,
    projectId: 0,
    status: 2,
    taskManagers: [],
  },
  project: {
    projectId: 0,
    title: '',
    thumbnail: {
      type: 'N',
      value: '',
    },
    subTitle: '',
    description: '',
    startDate: undefined,
    endDate: undefined,
    members: [],
  },

  // validation errorList

  errorList: [],
};

// 업무 생성 Store

const useTaskStore = create<TaskState & TaskActions>((set) => ({
  ...initialState,
  actions: {
    setTitleImage: (titleImage) => {
      set(() => ({
        titleImage,
      }));
    },
    setTaskId: (taskId) => {
      set(() => ({
        taskId,
      }));
    },
    setTitle: (title) => {
      set((state) => ({
        payload: {
          ...state.payload,
          title,
        },
      }));
    },
    setDescription: (description) => {
      set((state) => ({
        payload: {
          ...state.payload,
          description,
        },
      }));
    },
    setStartDate: (startDate) => {
      set((state) => ({
        payload: {
          ...state.payload,
          startDate,
        },
      }));
    },
    setEndDate: (endDate) => {
      set((state) => ({
        payload: {
          ...state.payload,
          endDate,
        },
      }));
    },
    setParentTaskId: (parentTaskId) => {
      set((state) => ({
        payload: {
          ...state.payload,
          parentTaskId,
        },
      }));
    },
    setProjectId: (projectId) => {
      set((state) => ({
        payload: {
          ...state.payload,
          projectId,
        },
      }));
    },
    setStatus: (status) => {
      set((state) => ({
        payload: {
          ...state.payload,
          status,
        },
      }));
    },
    setTaskManagers() {
      set((state) => ({
        payload: {
          ...state.payload,
          taskManagers: [],
        },
      }));
    },
    setImages: (image) => {
      set((state) => ({
        payload: {
          ...state.payload,
          images: Array.from(new Set([...(state.images || []), image])),
        },
      }));
    },
    resetPayload: () => {
      set(() => ({
        ...initialState,
      }));
    },
    // edit
    setEditTask: (task) => {
      set(() => ({
        payload: {
          ...task,
          startDate: task.startDate ? new Date(task.startDate) : undefined,
          endDate: task.endDate ? new Date(task.endDate) : undefined,
        },
      }));
    },

    // project
    setProject: (project) => {
      set((state) => ({
        ...state,
        project: {
          ...project,
          startDate: project.startDate
            ? new Date(project.startDate)
            : undefined,
          endDate: project.endDate ? new Date(project.endDate) : undefined,
          thumbnail: {
            type: project.thumbnailType || 'N',
            value: project.thumbnail || '',
          },
        },
      }));
    },

    // errorList
    // validation check 시에 errorList 추가

    setErrorList: (errorList) => {
      set((state) => {
        return {
          ...state,
          errorList: Array.from(new Set([...state.errorList, errorList])),
        };
      });
    },

    // errorList 삭제
    // error 가 해결되거나 다시 입력 시에 errorList 삭제

    removeErrorList: (errorList) => {
      set((state) => {
        return {
          ...state,
          errorList: state.errorList.filter((error) => error !== errorList),
        };
      });
    },

    // errorList 초기화
    // 생성 모달 닫을 시에 errorList 초기화
    clearErrorList: () => {
      set((state) => {
        return {
          ...state,
          errorList: [],
        };
      });
    },
  },
}));

// 업무 생성 State 반환

export const useTaskState = () => useTaskStore((state) => state);

// 업무 생성 Actions 반환

export const useTaskActions = () => useTaskStore().actions;

export default useTaskStore;
