import { addDays, isSameDay, startOfWeek } from 'date-fns';
import { styled } from 'styled-components';
import { vars } from 'token';

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

interface GraphProps {
  task: TempTask;
  gridDay: {
    date: Date;
    formatDay: string;
  };
}

const setRadiusGraph = (isStart: boolean, isEnd: boolean) => {
  if (isStart) return '12px 0 0 12px';
  if (isEnd) return '0 12px 12px 0';
  return '0';
};

const GraphContainer = styled.div<{ $isstart: boolean; $isend: boolean }>`
  width: calc(100% + 1px);
  height: 32px;
  padding: 8px;
  border-right: 1px solid ${vars.sementic.color.alertOrange};
  border-radius: ${({ $isstart, $isend }) => setRadiusGraph($isstart, $isend)};
  background-color: ${vars.sementic.color.alertOrange};
  display: flex;
  gap: 4px;
  span {
    color: ${vars.sementic.color.black};
  }
`;

const Graph = ({ task, gridDay }: GraphProps) => {
  return (
    <GraphContainer
      $isstart={isSameDay(gridDay.date, addDays(task.startDate, 1))}
      $isend={isSameDay(gridDay.date, task.endDate)}
    >
      <span>
        {(isSameDay(startOfWeek(gridDay.date), gridDay.date) ||
          isSameDay(gridDay.date, addDays(task.startDate, 1))) &&
          task.title}
      </span>
    </GraphContainer>
  );
};

export default Graph;
