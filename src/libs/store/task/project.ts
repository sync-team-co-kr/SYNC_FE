import { create } from 'zustand';

import { TaskActions, TaskStore } from './types';

// 일정 + 프로젝트 관련 상태 관리

// Initial state
const initialState = {
  projects: [],
};

const useTaskWithProjectStore = create<TaskStore & TaskActions>((set) => ({
  ...initialState,
  actions: {
    setProjects: (projects) => {
      set({ projects });
    },
  },
}));

// taskWithProjectState 반환
export const useTaskWithProjectState = () =>
  useTaskWithProjectStore((state) => state.projects);

// taskWithProjectActions 반환
export const useTaskWithProjectActions = () =>
  useTaskWithProjectStore().actions;
