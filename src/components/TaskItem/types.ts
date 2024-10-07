import { Situation, WorkTags } from '@libs/store/task/types';

export interface TaskItemProps {
  title: string;
  subTitle: string;
  date: {
    start: Date;
    end: Date;
  };
  works: WorkTags[];
  situations: Situation[];
  thumbnail?: string;
  onClick: () => void;
}
