import { useContext } from 'react';

import { TimeTable } from '@components/TimeTable';
import { Typography } from '@components/common/Typography';
import { EditTaskModal } from '@components/modal/EditTaskModal';
import useModal from '@hooks/useModal';
import { useTaskWithProjectState } from '@libs/store/task/project';
import { useTaskActions } from '@libs/store/task/task';
import { useGetProjectIdList } from '@services/project/Project.hooks';
import { useGetTasks } from '@services/task/Task.hooks';
// import { useGetProjectIdList } from '@services/project/Project.hooks';
import styled from 'styled-components';

import { useRenderTaskFilter } from './\bCalendar.hooks';
import { CalendarContext } from './Calendar.provider';
import {
  GraphContainer,
  GraphItemsContainer,
  TimeContainer,
  TimeTableContainer,
  TimeTableItem,
  TimeTableLabel,
} from './Calendar.style';
import {
  formatTimeIntl,
  generateTimeSlots,
  getGridRowStart,
  getRowSpan,
} from './Calendar.utils';

const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  width: 100%;
`;

/**
 * 시간대별로 일정을 보여주는 컴포넌트
 */

export const CalendarDay = () => {
  const [openModal] = useModal();

  const project = useTaskWithProjectState();

  const { setTaskId } = useTaskActions();
  const { projectIdsList } = useGetProjectIdList() ?? {};

  const { tasks } =
    useGetTasks(project.title !== '' ? project.projectId : projectIdsList) ??
    {};

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
                projectId={schedule.id}
                parentTaskId={schedule.id}
                images={'https://picsum.photos/200/300'}
                title={schedule.title}
              />
            );
          })}
        </GraphItemsContainer>
      </GraphContainer>
      <TimeContainer>
        <TimeTableContainer>
          {generateTimeSlots().map((timeSlot) => (
            <TimeTableLabel key={timeSlot}>
              {/* 1시간 단위로 라벨을 09:00 형식으로 표시 */}
              {
                <Typography color="black35" variant="small-text">
                  {timeSlot.endsWith('00') ? timeSlot : ''}
                </Typography>
              }
            </TimeTableLabel>
          ))}
        </TimeTableContainer>

        <TimeTableItem>
          {filteredSchedules.map((schedule, i: number) => {
            const startTime = new Date(schedule.startDate);
            const endTime = new Date(schedule.endDate);

            const rowStart = getGridRowStart(startTime);

            if (rowStart > 78 || rowStart < 0) return null;
            return (
              <TimeTable
                key={`${schedule.id}-${i}`}
                variant="timeTableMedium"
                onClick={() => EditModalOpenHandler(schedule.id)}
                status={returnStatus(schedule.status)}
                startTime={formatTimeIntl(startTime)}
                endTime={formatTimeIntl(endTime)}
                description={schedule.description}
                rowSpan={getRowSpan(startTime, endTime)}
                gridRowStart={getGridRowStart(startTime)}
                projectId={schedule.id}
                parentTaskId={schedule.id}
                images={'https://picsum.photos/200/300'}
                title={schedule.title}
              />
            );
          })}
        </TimeTableItem>
      </TimeContainer>
    </DayContainer>
  );
};
