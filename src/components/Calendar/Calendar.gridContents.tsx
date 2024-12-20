import Graph from '@components/Graph';
import { differenceInDays, isWithinInterval } from 'date-fns';

interface TempTask {
  taskId: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  depth: number;
  progress: number;
  status: number;
}

interface GridContentsProps {
  tasks?: TempTask[];
  gridDay: {
    date: Date;
    formatDay: string;
  };
}

const GridContents = ({ tasks, gridDay }: GridContentsProps) => {
  const isTaskScheduleWithInInterval = (task: TempTask) => {
    const interval = {
      start: new Date(task.startDate),
      end: new Date(task.endDate),
    };
    return isWithinInterval(gridDay.date, interval);
  };

  const getTaskScheduleLength = (start: string, end: string) =>
    differenceInDays(end, start);

  if (!tasks) return <></>;
  return (
    <>
      {tasks
        .filter(
          (task) =>
            isTaskScheduleWithInInterval(task) &&
            getTaskScheduleLength(task.startDate, task.endDate) >= 3,
        )
        .map((task) => (
          <Graph key={task.taskId} task={task} gridDay={gridDay} />
        ))}
      {tasks
        .filter(
          (task) =>
            isTaskScheduleWithInInterval(task) &&
            getTaskScheduleLength(task.startDate, task.endDate) < 3,
        )
        .map((task) => (
          <div key={task.taskId}>{task.title}</div>
        ))}
    </>
  );
};

export default GridContents;
