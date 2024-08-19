import { Typography } from '@components/common/Typography';
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
  flex-direction: column;
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
  display: flex;
  width: 100%;
  padding: 6px 2.5px;
  height: 72px;
  margin-top: 6px;
  border-top: 1px solid ${vars.sementic.color.black10};
`;

const Test = styled.div`
  padding: 4px;
  background: ${vars.sementic.color.lightPurple};
  width: 100%;
  border-radius: 4px;
  align-items: center;
`;

const generateTimeSlots = () => {
  // 09:00 ~ 22:00 까지 시간 단위로 배열 생성
  const timeSlots = Array.from({ length: 14 }, (_, i) => {
    const hour = i + 9;
    return `${hour}:00`;
  });

  return timeSlots;
};

export const CalendarDay = () => {
  return (
    <Container>
      <GraphContainer>
        <Typography color="black35" variant="small-text">
          종일
        </Typography>
        <GraphItemsContainer>
          {Array.from({ length: 10 }, (_, i) => (
            <Test key={i}>일정이 들어가욘</Test>
          ))}
        </GraphItemsContainer>
      </GraphContainer>
      <TimeContainer>
        {generateTimeSlots().map((time) => (
          <TimeTableLabel key={time}>
            <Typography key={time} color="black35" variant="small-text">
              {time}
            </Typography>
            <TimeTableItem>일정이 들어가욘</TimeTableItem>
          </TimeTableLabel>
        ))}
      </TimeContainer>
    </Container>
  );
};
