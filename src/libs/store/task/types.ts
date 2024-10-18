import { RawProject } from '@customTypes/project';

// calendar store
export type TaskCalendar = 'month' | 'week' | 'day';
export type TaskCalendarButton = 'prev' | 'next';
export type CalendarStore = {
  currentDate: Date;
};

export type CalendarActions = {
  actions: {
    setCurrentDate: (button: TaskCalendarButton, type: TaskCalendar) => void;
  };
};

// task filter store

// 테스크, 서브테스크, 퀘스트
export type WorkTags = 'task' | 'subTask' | 'quest';
// 내 업무, 해야할 일, 진행중, 완료
export type Situation = 'todo' | 'doing' | 'done';
export type TaskFilterStore = {
  workState: WorkTags[];
  situationState: Situation[];
};

export type TaskFilterActions = {
  actions: {
    setWorkState: (workState: WorkTags) => void;
    setSituationState: (situationState: Situation) => void;
  };
};

// task + project store

export type TaskStore = {
  projects: RawProject[];
};
export interface TaskActions {
  actions: {
    setProjects: (projects: RawProject[]) => void;
  };
}
