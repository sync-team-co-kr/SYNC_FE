import { TimeTable } from '@components/TimeTable';
import { Typography } from '@components/common/Typography';
import {
  addMinutes,
  differenceInMinutes,
  isWithinInterval,
  parse,
  setHours,
} from 'date-fns';
import styled from 'styled-components';
import { vars } from 'token';

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
  gap: 8px;
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
  grid-template-rows: repeat(78, 1fr);
  padding: 6px 2.5px;
  border-top: 1px solid ${vars.sementic.color.black10};
  gap: 12px;
  grid-auto-flow: row;
`;

const TimeTableContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(78, 1fr);
`;
type DummySchedule = {
  id: number;
  title: string;
  description: string;
  status: number;
  startTime: Date;
  endTime: Date;
};

const formatTimeIntl = (date: Date) => {
  return new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
};

const generateTimeSlots = (): string[] => {
  const startHour = 9; // 시작 시간
  const endHour = 22; // 종료 시간

  const intervalMinutes = 10; // 10분 간격

  const slots: string[] = [];
  let currentTime = setHours(new Date(), startHour);
  currentTime.setMinutes(0);

  while (currentTime.getHours() < endHour) {
    const formattedTime = new Intl.DateTimeFormat('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(currentTime);

    slots.push(formattedTime);
    currentTime = addMinutes(currentTime, intervalMinutes);
  }

  return slots;
};

const sortSchedules = (schedules: DummySchedule[]) => {
  // 아직 어떻게 정렬할지 몰라서 any 처리
  return schedules.sort((a, b) => {
    if (a.status !== b.status) return b.status - a.status;
    if (a.endTime !== b.endTime)
      return a.endTime.getTime() - b.endTime.getTime();
    if (a.startTime !== b.startTime)
      return a.startTime.getTime() - b.startTime.getTime();
    return a.title.localeCompare(b.title);
  });
};

const getRowSpan = (startTime: Date, endTime: Date) => {
  const totalMinutesInADay = 13 * 60; // 9시 ~ 22시까지 13시간
  const minutesPerRow = totalMinutesInADay / 78; // 78행으로 나눔

  const totalMinutes = differenceInMinutes(endTime, startTime);
  return Math.ceil(totalMinutes / minutesPerRow);
};

const getGridRowStart = (startTime: Date) => {
  const startMinutes = differenceInMinutes(startTime, setHours(startTime, 9));
  const minutesPerRow = (13 * 60) / 78; // 총 분을 78행으로 나눔
  return Math.ceil(startMinutes / minutesPerRow) + 1; // 그리드 행은 1부터 시작
};

const now = setHours(new Date(), 10);

const dummySchedules: DummySchedule[] = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  title: `일정 ${i}`,
  description: `설명 ${i}`,
  status: i % 3,
  startTime: new Date(now.getTime() + 1000 * 60 * 15 * i),
  endTime: new Date(now.getTime() + 1000 * 60 * 15 * (i + 1)),
}));

const getSchedulesForTimeSlot = (
  schedules: DummySchedule[],
  timeSlots: string[],
) => {
  const timeSlotSchedules: Record<string, any> = {};

  timeSlots.forEach((timeSlot) => {
    const time = parse(timeSlot, 'HH:mm', new Date());

    const scheduleForTimeSlot = schedules.filter((schedule) =>
      isWithinInterval(time, {
        start: schedule.startTime,
        end: schedule.endTime,
      }),
    );

    if (scheduleForTimeSlot.length > 0) {
      timeSlotSchedules[timeSlot] = scheduleForTimeSlot;
    }
  });
  return timeSlotSchedules;
};

export const CalendarDay = () => {
  const timeSlots = generateTimeSlots();
  const groupedSchedules = getSchedulesForTimeSlot(
    sortSchedules(dummySchedules),
    timeSlots,
  ); // 시간 슬롯별로 일정을 그룹화

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

  return (
    <Container>
      <GraphContainer>
        <Typography color="black35" variant="small-text">
          종일
        </Typography>
        <GraphItemsContainer>
          {Object.entries(groupedSchedules).map(([timeSlot, schedules]) => {
            return schedules.map((schedule: any, i: number) => (
              <TimeTable
                key={`${timeSlot}-${i}`}
                variant="graph"
                status={returnStatus(schedule.status)}
                startTime={formatTimeIntl(schedule.startTime)}
                endTime={formatTimeIntl(schedule.endTime)}
                description={schedule.description}
                rowSpan={getRowSpan(schedule.startTime, schedule.endTime)}
                gridRowStart={getGridRowStart(schedule.startTime)}
                projectId={schedule.id}
                parentTaskId={schedule.id}
                images={'https://picsum.photos/200/300'}
                title={schedule.title}
              />
            ));
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
          {Object.entries(groupedSchedules).map(([timeSlot, schedules]) => {
            return schedules.map((schedule: any, i: number) => (
              <TimeTable
                key={`${timeSlot}-${i}`}
                variant="timeTableMedium"
                status={returnStatus(schedule.status)}
                startTime={formatTimeIntl(schedule.startTime)}
                endTime={formatTimeIntl(schedule.endTime)}
                description={schedule.description}
                rowSpan={getRowSpan(schedule.startTime, schedule.endTime)}
                gridRowStart={getGridRowStart(schedule.startTime)}
                projectId={schedule.id}
                parentTaskId={schedule.id}
                images={'https://picsum.photos/200/300'}
                title={schedule.title}
              />
            ));
          })}
        </TimeTableItem>
      </TimeContainer>
    </Container>
  );
};
