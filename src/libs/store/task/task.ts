import { Project } from '@customTypes/project';
import { CreateTaskRequestDto } from '@services/swagger/output/data-contracts';
import { create } from 'zustand';

// 업무 생성 State
type TaskState = {
  payload: CreateTaskRequestDto;
  project: Project;
  errorList: string[];
};
type TaskActions = {
  actions: {
    // 업무 state 변경
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    setStartDate: (startDate: string) => void;
    setEndDate: (endDate: string) => void;
    setParentTaskId: (parentTaskId: number) => void;
    setProjectId: (projectId: number) => void;
    setStatus: (status: number) => void;
    setImages: (image: File) => void;

    // reset
    resetPayload: () => void;

    // project
    setProject: (project: Project) => void;

    // errorList
    setErrorList: (errorList: string) => void;

    // removeErrorList

    removeErrorList: (errorList: string) => void;

    // clearErrorList
    clearErrorList: () => void;
  };
};

const initialState: TaskState = {
  payload: {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    parentTaskId: 0,
    projectId: 0,
    status: 0,
    images: [],
  },
  project: {
    projectId: 0,
    title: '',
    subTitle: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    memberIds: [],
  },

  errorList: [],
};

// 업무 생성 Store

const useTaskStore = create<TaskState & TaskActions>((set) => ({
  ...initialState,
  actions: {
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
    setImages: (image) => {
      set((state) => ({
        payload: {
          ...state.payload,
          images: Array.from(new Set([...(state.payload.images || []), image])),
        },
      }));
    },
    resetPayload: () => {
      set(() => ({
        ...initialState,
      }));
    },

    // project
    setProject: (project) => {
      set(() => ({
        project,
      }));
    },

    // errorList
    setErrorList: (errorList) => {
      set((state) => {
        return {
          ...state,
          errorList: Array.from(new Set([...state.errorList, errorList])),
        };
      });
    },

    // errorList 삭제
    removeErrorList: (errorList) => {
      set((state) => {
        return {
          ...state,
          errorList: state.errorList.filter((error) => error !== errorList),
        };
      });
    },

    // errorList 초기화
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
