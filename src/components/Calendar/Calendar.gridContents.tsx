import Graph from '@components/Graph';
import { TimeTable } from '@components/TimeTable/TimeTable';
import { differenceInDays, isWithinInterval } from 'date-fns';
import { styled } from 'styled-components';

import { formatTimeIntl } from './Calendar.utils';

const GraphArea = styled.section`
  width: 100%;
  height: 270px;
  margin-bottom: 60px;
`;

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

  console.log(tasks);

  if (!tasks) return <></>;
  return (
    <>
      <GraphArea>
        {tasks
          .filter(
            (task) =>
              isTaskScheduleWithInInterval(task) &&
              getTaskScheduleLength(task.startDate, task.endDate) >= 3,
          )
          .map((task) => (
            <Graph key={task.taskId} task={task} gridDay={gridDay} />
          ))}
      </GraphArea>

      {tasks
        .filter(
          (task) =>
            isTaskScheduleWithInInterval(task) &&
            getTaskScheduleLength(task.startDate, task.endDate) < 3,
        )
        .map((task) => (
          <TimeTable
            key={task.taskId}
            variant="timeTableMedium"
            title={task.title}
            description={task.description}
            startTime={formatTimeIntl(new Date(task.startDate))}
            endTime={formatTimeIntl(new Date(task.endDate))}
            status={'task'}
            parentTaskId={0}
            images={'https://picsum.photos/200/300'}
          />
        ))}
    </>
  );
};

export default GridContents;
