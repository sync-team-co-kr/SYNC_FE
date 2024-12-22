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

const setGraphColor = (attribute: number) => {
  if (attribute === 0) return `${vars.sementic.color.lightPurple}`;
  if (attribute === 1) return `${vars.sementic.color.alertLightOrange}`;
  return `${vars.sementic.color.lightGreen}`;
};

const setGraphAccentColor = (attribute: number) => {
  if (attribute === 0) return `${vars.sementic.color.purple}`;
  if (attribute === 1) return `${vars.sementic.color.alertOrange}`;
  return `${vars.sementic.color.green}`;
};

const GraphContainer = styled.div<{
  $isstart: boolean;
  $isend: boolean;
  $attribute: number;
}>`
  width: calc(100% + 1px);
  height: 32px;
  padding: 8px;
  border-right: 1px solid ${(props) => setGraphColor(props.$attribute)};
  border-radius: ${({ $isstart, $isend }) => setRadiusGraph($isstart, $isend)};
  background-color: ${(props) => setGraphColor(props.$attribute)};
  display: flex;
  gap: 4px;
  span {
    color: ${vars.sementic.color.black};
    font-size: 14px;
    font-weight: 700;
  }
`;

const GraphAccent = styled.div<{ $isgraphstart: boolean; $attribute: number }>`
  width: 4px;
  height: 16px;
  background-color: ${(props) =>
    props.$isgraphstart && setGraphAccentColor(props.$attribute)};
`;

const Graph = ({ task, gridDay }: GraphProps) => {
  console.log(gridDay.date, task.endDate);
  return (
    <GraphContainer
      $isstart={isSameDay(gridDay.date, addDays(task.startDate, 1))}
      $isend={isSameDay(gridDay.date, task.endDate)}
      $attribute={0}
    >
      <GraphAccent
        $isgraphstart={
          isSameDay(startOfWeek(gridDay.date), gridDay.date) ||
          isSameDay(gridDay.date, addDays(task.startDate, 1))
        }
        $attribute={0}
      ></GraphAccent>
      <span>
        {(isSameDay(startOfWeek(gridDay.date), gridDay.date) ||
          isSameDay(gridDay.date, addDays(task.startDate, 1))) &&
          task.title}
      </span>
    </GraphContainer>
  );
};

export default Graph;
