/*
            {tasks
              ?.filter((task) => {
                const interval = {
                  start: new Date(task.startDate),
                  end: new Date(task.endDate),
                };
                const isTaskScheduleWithInInterval = isWithinInterval(
                  day.date,
                  interval,
                );
                return isTaskScheduleWithInInterval;
              })
              .map((task) => <div key={task.taskId}>{task.title}</div>)}
*/
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

  return (
    <>
      {tasks
        ?.filter(
          (task) =>
            isTaskScheduleWithInInterval(task) &&
            getTaskScheduleLength(task.startDate, task.endDate) >= 3,
        )
        .map((task) => <div key={task.taskId}>{task.title}</div>)}
      {tasks
        ?.filter(
          (task) =>
            isTaskScheduleWithInInterval(task) &&
            getTaskScheduleLength(task.startDate, task.endDate) < 3,
        )
        .map((task) => <div key={task.taskId}>{task.title}</div>)}
    </>
  );
};

export default GridContents;
