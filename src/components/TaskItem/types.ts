import { TaskState, TaskStatus } from '@libs/store/task/types';

export interface TaskItemProps {
  title: string;
  description: string;
  date: {
    start: Date;
    end: Date;
  };
  state: TaskState[];
  status: TaskStatus[];
  onClick: () => void;
}
