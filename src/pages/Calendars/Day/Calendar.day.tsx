import { useContext } from 'react';

import useFilterDayCalendarTimeTables from '@components/Calendar/hooks/useFilterDayCalendarTimeTables';
import { TimeTable } from '@components/TimeTable';
import { Typography } from '@components/common/Typography';
import { EditTaskModal } from '@components/modal/EditTaskModal';
import { modalStore } from '@libs/store';
import { useTaskActions, useTaskState } from '@libs/store/task/task';
import { CalendarContext } from '@pages/Calendars/Calendar.provider';
import {
  formatTimeIntl,
  getGridRowStart,
  getRowSpan,
} from '@pages/Calendars/Calendar.utils';
import useFilterSearchQuery from '@pages/Calendars/hooks/useFilterSearchQuery';
import {
  GraphContainer,
  GraphItemsContainer,
} from '@pages/Calendars/styles/Calendar.style';
import { useGetProjectIds } from '@services/project/Project.hooks';
import { useGetTasks } from '@services/task/Task.hooks';
import styled from 'styled-components';
import { vars } from 'token';

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

const TimeTableItem = styled.li`
  padding: 4px 12px;
  background-color: ${vars.sementic.color.lightPurple};
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TimeTableAccent = styled.div`
  width: 6px;
  height: 30px;
  background-color: ${vars.sementic.color.purple};
  border-radius: 999px;
`;

const TimeTableContent = styled.article`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TimeTableDescription = styled.section`
  font-size: ${vars.sementic.typography['small-text']};
  display: flex;
  align-items: center;
  gap: 4px;
  div {
    width: 16px;
    height: 16px;
    background-color: ${vars.sementic.color.black35};
    border-radius: 4px;
  }
`;

const TimeTableTitle = styled.h5`
  font-size: ${vars.sementic.typography['small-text']};
  font-weight: 700;
`;

const TimeTablePeriod = styled.p`
  font-size: ${vars.sementic.typography['small-text']};
`;

/**
 * 시간대별로 일정을 보여주는 컴포넌트
 */

export const CalendarDay = () => {
  const { openModal } = modalStore();

  const { project } = useTaskState();
  const { setTaskId } = useTaskActions();
  const { projectIds } = useGetProjectIds();

  const { tasks } =
    useGetTasks(project.title !== '' ? project.projectId : projectIds) ?? {};

  const searchQueryResult = useFilterSearchQuery(tasks);

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
    openModal(EditTaskModal, '업무 수정');
    setTaskId(taskId);
  };

  const filteredSchedules = useFilterDayCalendarTimeTables(
    value,
    searchQueryResult || tasks,
  );

  return (
    <DayContainer>
      <GraphContainer>
        <Typography color="black35" variant="small-text">
          종일
        </Typography>
        <GraphItemsContainer>
          {filteredSchedules.allDaySchedules &&
            filteredSchedules.allDaySchedules.map((schedule) => {
              const startTime = new Date(schedule.startDate);
              const endTime = new Date(schedule.endDate);

              return (
                <TimeTable
                  key={schedule.taskId}
                  onDoubleClick={() => EditModalOpenHandler(schedule.taskId)}
                  variant="graph"
                  status={returnStatus(schedule.status)}
                  startTime={formatTimeIntl(startTime)}
                  endTime={formatTimeIntl(endTime)}
                  description={schedule.description}
                  rowSpan={getRowSpan(startTime, endTime)}
                  gridRowStart={getGridRowStart(startTime)}
                  parentTaskId={schedule.taskId}
                  images={'https://picsum.photos/200/300'}
                  title={schedule.title}
                />
              );
            })}
        </GraphItemsContainer>
      </GraphContainer>
      <DayScheduleContainer>
        {filteredSchedules.daySchedules.map(({ timeslot, timeTables }) => (
          <DayScheduleItem key={timeslot}>
            <TimeSlot>
              {timeslot >= 10
                ? `${timeslot}:00`
                : `${String(timeslot).padStart(2, '0')}:00`}
            </TimeSlot>
            <TimeTableList>
              {timeTables?.map((timeTable) => (
                <TimeTableItem
                  key={timeTable.taskId}
                  onDoubleClick={() => EditModalOpenHandler(timeTable.taskId)}
                >
                  <TimeTableAccent></TimeTableAccent>
                  <TimeTableContent>
                    <TimeTableDescription>
                      <div></div>
                      <p>{timeTable.description}</p>
                    </TimeTableDescription>
                    <TimeTableTitle>{timeTable.title}</TimeTableTitle>
                    <TimeTablePeriod></TimeTablePeriod>
                  </TimeTableContent>
                </TimeTableItem>
              ))}
            </TimeTableList>
          </DayScheduleItem>
        ))}
      </DayScheduleContainer>
    </DayContainer>
  );
};
