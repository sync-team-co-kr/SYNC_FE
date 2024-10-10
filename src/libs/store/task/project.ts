import { Project } from '@customTypes/project';
import { create } from 'zustand';

import { TaskActions, TaskStore } from './types';

// 일정 + 프로젝트 관련 상태 관리

// Initial state
const initialState = {
  project: {
    projectId: 0,
    title: '',
    subTitle: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
  },
};

const useTaskWithProjectStore = create<TaskStore & TaskActions>((set) => ({
  project: initialState.project,
  actions: {
    setProject: (project: Project) => set({ project }),
  },
}));

// taskWithProjectState 반환
export const useTaskWithProjectState = () =>
  useTaskWithProjectStore((state) => state);

// taskWithProjectActions 반환
export const useTaskWithProjectActions = () =>
  useTaskWithProjectStore().actions;
