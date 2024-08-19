import { TimeTable } from '@components/TimeTable';
import { Typography } from '@components/common/Typography';
import { setHours } from 'date-fns';
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
  & > div:nth-child(6n) {
    border-top: 1px solid ${vars.sementic.color.black10};
  }
`;

const TimeTableContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(78, 1fr);
`;

const formatTimeIntl = (date: Date) => {
  return new Intl.DateTimeFormat('ko-KR', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
};

const generateTimeSlots = () => {
  const hours = Array.from({ length: 14 }, (_, i) => i + 9); // 9시부터 22시까지
  const minutes = [0, 10, 20, 30, 40, 50]; // 10분 단위로 표시

  const timeSlots = hours.flatMap((hour) =>
    minutes.map(
      (minute) =>
        `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
    ),
  );

  return timeSlots;
};

const sortSchedules = (schedules: any[]) => {
  // 아직 어떻게 정렬할지 몰라서 any 처리
  return schedules.sort((a, b) => {
    // 업무 속성 높은 순
    if (a.status !== b.status) return b.status - a.status;
    // 마감일 빠른 순
    if (a.endTime !== b.endTime) return a.endTime - b.endTime;
    // 시작일 빠른 순
    if (a.startTime !== b.startTime) return a.startTime - b.startTime;
    return a.title.localCompare(b.title);
  });
};

const getRowSpan = (startTime: Date, endTime: Date) => {
  const totalMinutesInADay = 24 * 60; // 하루 1440분
  // 15분 단위로 나누었을때 52줄이었으니 10분 단위로 나누면 78줄
  const minutesPerRow = totalMinutesInADay / 78;

  const startMinutes = startTime.getHours() * 60 + startTime.getMinutes(); // 시작 시간을 분으로 변환
  const endMinutes = endTime.getHours() * 60 + endTime.getMinutes(); // 종료 시간을 분으로 변환
  const totalMinutes = endMinutes - startMinutes;

  return Math.ceil(totalMinutes / minutesPerRow);
};

const getGridRowStart = (startTime: Date) => {
  const startHour = startTime.getHours();
  const startMinute = startTime.getMinutes();

  // 9시부터 시작하므로 9시 이전의 시간은 고려하지 않음
  const adjustedHour = startHour - 9;

  // 시간대를 10분 간격으로 나눔
  const timeSlotIndex = adjustedHour * 4 + Math.floor(startMinute / 10);

  return timeSlotIndex + 1; // 그리드 행 번호는 1부터 시작
};

const now = setHours(new Date(), 10);
const dummySchedules = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  title: `일정 ${i}`,
  description: `설명 ${i}`,
  status: i % 3,
  startTime: new Date(now.getTime() + 1000 * 60 * 15 * i),
  endTime: new Date(now.getTime() + 1000 * 60 * 15 * (i + 1)),
}));

const getSchedulesForTimeSlot = (schedules: any[], timeSlot: string) => {
  const [hour, minute] = timeSlot.split(':').map(Number);
  const time = new Date();
  time.setHours(hour);
  time.setMinutes(minute);

  return schedules.filter(
    (schedule) =>
      schedule.startTime.getTime() <= time.getTime() &&
      schedule.endTime.getTime() > time.getTime(),
  );
};

export const CalendarDay = () => {
  const sortedSchedules = sortSchedules(dummySchedules);
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
          {sortedSchedules.slice(0, 5).map((schedule, i) => (
            <TimeTable
              key={i}
              variant="graph"
              status="task"
              startTime={formatTimeIntl(schedule.startTime)}
              endTime={formatTimeIntl(schedule.endTime)}
              description="일정이 들어가욘"
              projectId={i}
              parentTaskId={i + 1}
              images={'https://picsum.photos/200/300'}
              title="일정이 들어가욘"
            ></TimeTable>
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
                  {timeSlot.split(':')[1] === '00'
                    ? `${timeSlot.split(':')[0]}:00`
                    : ''}
                </Typography>
              }
            </TimeTableLabel>
          ))}
        </TimeTableContainer>

        <TimeTableItem>
          {generateTimeSlots().map((timeSlot) => {
            const schedulesForTimeSlot = getSchedulesForTimeSlot(
              sortedSchedules,
              timeSlot,
            );
            return schedulesForTimeSlot.map((schedule, i) => (
              <TimeTable
                key={i}
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
