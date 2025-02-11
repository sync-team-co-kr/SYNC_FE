import { useNavigate } from 'react-router-dom';

import Graph from '@components/Graph';
import { TimeTable } from '@components/TimeTable/TimeTable';
import { EditTaskModal } from '@components/modal/EditTaskModal';
import { ICalendarDay } from '@customTypes/calendar';
import { ITask } from '@customTypes/task';
import { modalStore } from '@libs/store';
import { useCalendarActions } from '@libs/store/calendar/calendarDate';
import { useTaskActions } from '@libs/store/task/task';
import { formatTimeIntl } from '@pages/Calendars/Calendar.utils';
import getInterval from '@pages/Calendars/utils/getInterval';
import convertSharp from '@utils/date/convertSharp';
import { differenceInDays, isWithinInterval } from 'date-fns';
import { styled } from 'styled-components';

const GraphArea = styled.section`
  width: 100%;
  height: 270px;
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EmptyGraph = styled.div`
  width: calc(100% + 1px);
  height: 32px;
`;

interface GridContentsProps {
  schedules: (ITask | null)[];
  tasks?: ITask[];
  gridDay: ICalendarDay;
}

const WeekGridContents = ({ schedules, tasks, gridDay }: GridContentsProps) => {
  const navigate = useNavigate();
  const { setTaskId } = useTaskActions();
  const { setSpecificDate } = useCalendarActions();
  const { openModal } = modalStore();

  const isTaskScheduleWithInInterval = (task: ITask) => {
    const start = convertSharp(new Date(task.startDate));
    const end = convertSharp(new Date(task.endDate));
    const interval = getInterval(start.toISOString(), end.toISOString());
    return isWithinInterval(gridDay.date, interval);
  };

  // 업무 일정의 길이 구하기
  const getTaskScheduleLength = (start: string, end: string) =>
    differenceInDays(end, start);

  // 일 캘린더로 이동
  const moveDayCalendar = () => {
    setSpecificDate(gridDay.date);
    navigate(`/calendars/day`);
  };

  // 더블 클릭 시 업무 수정 모달 활성화
  const EditModalOpenHandler = (taskId: number) => {
    openModal(EditTaskModal, '업무 수정');
    setTaskId(taskId);
  };

  if (!tasks) return <></>;
  return (
    <>
      <GraphArea>
        {schedules.map((schedule, i) =>
          schedule ? (
            <Graph
              key={schedule.taskId}
              schedule={schedule}
              gridDay={gridDay}
              moveDayCalendar={moveDayCalendar}
              onDoubleClick={() => EditModalOpenHandler(schedule.taskId)}
            />
          ) : (
            <EmptyGraph key={i}></EmptyGraph>
          ),
        )}
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
            moveDayCalendar={moveDayCalendar}
            images={'https://picsum.photos/200/300'}
            onDoubleClick={() => EditModalOpenHandler(task.taskId)}
          />
        ))}
    </>
  );
};

export default WeekGridContents;
