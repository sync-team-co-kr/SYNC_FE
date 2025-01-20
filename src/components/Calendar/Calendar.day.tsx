import { useContext } from 'react';

import useFilterDayCalendarTimeTables from '@components/Calendar/hooks/useFilterDayCalendarTimeTables';
import { TimeTable } from '@components/TimeTable';
import { Typography } from '@components/common/Typography';
import { EditTaskModal } from '@components/modal/EditTaskModal';
import useModal from '@hooks/useModal';
import { useTaskActions, useTaskState } from '@libs/store/task/task';
import { useGetProjectIds } from '@services/project/Project.hooks';
import { useGetTasks } from '@services/task/Task.hooks';
import styled from 'styled-components';
import { vars } from 'token';

import { useRenderTaskFilter } from './Calendar.hooks';
import { CalendarContext } from './Calendar.provider';
import { GraphContainer, GraphItemsContainer } from './Calendar.style';
import { formatTimeIntl, getGridRowStart, getRowSpan } from './Calendar.utils';

const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  width: 100%;
`;

const DayScheduleContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

const DayScheduleItem = styled.div`
  height: 72px;
  display: flex;
  gap: 16px;
`;

const TimeSlot = styled.div`
  width: 45px;
  color: ${vars.sementic.color.black35};
`;

const TimeTableList = styled.ul`
  width: calc(100% - 55px);
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20%, auto));
  column-gap: 10px;
`;

const timeslots = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];

/**
 * 시간대별로 일정을 보여주는 컴포넌트
 */

export const CalendarDay = () => {
  const [openModal] = useModal();

  const { project } = useTaskState();
  const { setTaskId } = useTaskActions();
  const { projectIds } = useGetProjectIds();

  const { tasks } =
    useGetTasks(project.title !== '' ? project.projectId : projectIds) ?? {};

  const { value } = useContext(CalendarContext);
  const returnStatus = (status: number) => {
    switch (status) {
      case 0:
        return 'task';
      case 1:
        return 'sub';
      case 2:
        return 'quest';
      default:
        return 'task';
    }
  };

  const EditModalOpenHandler = (taskId: number) => {
    openModal(EditTaskModal);
    setTaskId(taskId);
  };

  const filteredSchedules = useRenderTaskFilter(tasks, value);

  const filteredTasks = useFilterDayCalendarTimeTables(value, tasks);

  console.log(filteredTasks);

  return (
    <DayContainer>
      <GraphContainer>
        <Typography color="black35" variant="small-text">
          종일
        </Typography>
        <GraphItemsContainer>
          {filteredSchedules.map((schedule) => {
            const startTime = new Date(schedule.startDate);
            const endTime = new Date(schedule.endDate);

            return (
              <TimeTable
                key={schedule.id}
                onClick={() => EditModalOpenHandler(schedule.id)}
                variant="graph"
                status={returnStatus(schedule.status)}
                startTime={formatTimeIntl(startTime)}
                endTime={formatTimeIntl(endTime)}
                description={schedule.description}
                rowSpan={getRowSpan(startTime, endTime)}
                gridRowStart={getGridRowStart(startTime)}
                parentTaskId={schedule.id}
                images={'https://picsum.photos/200/300'}
                title={schedule.title}
              />
            );
          })}
        </GraphItemsContainer>
      </GraphContainer>
      <DayScheduleContainer>
        {timeslots.map((timeslot) => (
          <DayScheduleItem key={timeslot}>
            <TimeSlot>
              {timeslot >= 10
                ? `${timeslot}:00`
                : `${String(timeslot).padStart(2, '0')}:00`}
            </TimeSlot>
            <TimeTableList></TimeTableList>
          </DayScheduleItem>
        ))}
      </DayScheduleContainer>
    </DayContainer>
  );
};
