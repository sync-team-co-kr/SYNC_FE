import type { Situation, WorkTags } from '@libs/store/calendar/types';

export const WORK_TAGS = {
  task: '테스크' as WorkTags,
  subTask: '서브테스크' as WorkTags,
  quest: '퀘스트' as WorkTags,
} as const;
export const SITUATION_TAGS = {
  main: '메인' as Situation,
  todo: '할일' as Situation,
  done: '완료' as Situation,
  doing: '진행중' as Situation,
} as const;
