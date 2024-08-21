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
export type TaskStatus = 'task' | 'subTask' | 'quest';
// 내 업무, 해야할 일, 진행중, 완료
export type TaskState = 'main' | 'todo' | 'doing' | 'done';
export type TaskFilterStore = {
  filterStatus: TaskStatus[];
  filterState: TaskState[];
};

export type TaskFilterActions = {
  actions: {
    setTaskFilter: (filterStatus: TaskStatus, filterState: TaskState) => void;
  };
};
