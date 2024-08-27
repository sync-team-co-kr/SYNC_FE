import { CreateTaskRequestDto } from '@services/swagger/output/data-contracts';
import { create } from 'zustand';

// 업무 생성 State
type TaskState = {
  payload: CreateTaskRequestDto;
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
  },
}));

// 업무 생성 State 반환

export const useTaskState = () => useTaskStore((state) => state);

// 업무 생성 Actions 반환

export const useTaskActions = () => useTaskStore().actions;
