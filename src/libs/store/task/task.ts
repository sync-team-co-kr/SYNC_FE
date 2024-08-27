import { CreateTaskRequestDto } from '@services/swagger/output/data-contracts';
import { create } from 'zustand';

// 업무 생성 State
type TaskState = CreateTaskRequestDto;
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
    setImages: (images: File[]) => void;

    // 업무 초기화
    resetTask: () => void;
  };
};

const initialState: TaskState = {
  title: '',
  description: '',
  startDate: '',
  endDate: '',
  parentTaskId: 0,
  projectId: 0,
  status: 0,
  images: [],
};

// 업무 생성 Store

const useTaskStore = create<TaskState & TaskActions>((set) => ({
  ...initialState,
  actions: {
    setTitle: (title) => {
      set({ title });
    },
    setDescription: (description) => {
      set({ description });
    },
    setStartDate: (startDate) => {
      set({ startDate });
    },
    setEndDate: (endDate) => {
      set({ endDate });
    },
    setParentTaskId: (parentTaskId) => {
      set({ parentTaskId });
    },
    setProjectId: (projectId) => {
      set({ projectId });
    },
    setStatus: (status) => {
      set({ status });
    },
    setImages: (images) => {
      set({ images });
    },
    resetTask: () => {
      set({ ...initialState });
    },
  },
}));

// 업무 생성 State 반환

export const useTaskState = () => useTaskStore((state) => state);

// 업무 생성 Actions 반환

export const useTaskActions = () => useTaskStore().actions;
