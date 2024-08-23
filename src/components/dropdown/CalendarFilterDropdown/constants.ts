import type { TaskState, TaskStatus } from '@libs/store/task/types';

export const FILTER_STATUS = {
  task: '테스크' as TaskStatus,
  subTask: '서브테스크' as TaskStatus,
  quest: '퀘스트' as TaskStatus,
} as const;
export const FILTER_STATE = {
  main: '메인' as TaskState,
  todo: '할일' as TaskState,
  done: '완료' as TaskState,
  doing: '진행중' as TaskState,
} as const;
