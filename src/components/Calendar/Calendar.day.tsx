import { useContext } from 'react';

import { TimeTable } from '@components/TimeTable';
import { Typography } from '@components/common/Typography';
import styled from 'styled-components';
import { vars } from 'token';

import { CalendarContext } from './Calendar.provider';
import {
  formatTimeIntl,
  generateTimeSlots,
  getGridRowStart,
  getRowSpan,
  getSchedulesForTimeSlot,
} from './Calendar.utils';
import { dummySchedules } from './constants';

/**
 * 시간대별로 일정을 보여주는 컴포넌트
 */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  width: 100%;
`;

const TimeContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
`;

const TimeTableLabel = styled.div`
  display: grid;
  grid-template-columns: 33px 2fr;
  column-gap: 10px;
  width: 100%;
`;

const GraphItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 158px;
  padding: 9px;
  overflow-y: auto;
`;

const GraphContainer = styled.div`
  display: grid;
  grid-template-columns: 33px 2fr;
  column-gap: 16px;
  align-items: center;
`;

const TimeTableItem = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: repeat(78, 12px);
  padding: 6px 2.5px;
  border-top: 1px solid ${vars.sementic.color.black10};
  column-gap: 12px;
  grid-auto-flow: row;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      transparent calc(12px * 6 - 1px),
      ${vars.sementic.color.black10} calc(12px * 6),
      transparent calc(12px * 6 + 1px),
      transparent 100%
    );
    background-size: 100% calc(12px * 6 + 1px);
  }
`;

const TimeTableContainer = styled.div`
  display: grid;

  grid-template-rows: repeat(78, 12px);
`;

export const CalendarDay = () => {
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

  // const projectTasks = useTaskWithProjectState();

  const schedulesTimeLine = getSchedulesForTimeSlot(dummySchedules, value);

  return (
    <Container>
      <GraphContainer>
        <Typography color="black35" variant="small-text">
          종일
        </Typography>
        <GraphItemsContainer>
          {schedulesTimeLine.map((schedule) => (
            <TimeTable
              key={schedule.id}
              variant="graph"
              status={returnStatus(schedule.status)}
              startTime={formatTimeIntl(schedule.startDate)}
              endTime={formatTimeIntl(schedule.endDate)}
              description={schedule.description}
              rowSpan={getRowSpan(schedule.startDate, schedule.endDate)}
              gridRowStart={getGridRowStart(schedule.startDate)}
              projectId={schedule.id}
              parentTaskId={schedule.id}
              images={'https://picsum.photos/200/300'}
              title={schedule.title}
            />
          ))}
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
          {schedulesTimeLine.map((schedule, i: number) => {
            const rowStart = getGridRowStart(schedule.startDate);

            if (rowStart > 78 || rowStart < 0) return null;
            return (
              <TimeTable
                key={`${schedule.id}-${i}`}
                variant="timeTableMedium"
                status={returnStatus(schedule.status)}
                startTime={formatTimeIntl(schedule.startDate)}
                endTime={formatTimeIntl(schedule.endDate)}
                description={schedule.description}
                rowSpan={getRowSpan(schedule.startDate, schedule.endDate)}
                gridRowStart={getGridRowStart(schedule.startDate)}
                projectId={schedule.id}
                parentTaskId={schedule.id}
                images={'https://picsum.photos/200/300'}
                title={schedule.title}
              />
            );
          })}
        </TimeTableItem>
      </TimeContainer>
    </Container>
  );
};
