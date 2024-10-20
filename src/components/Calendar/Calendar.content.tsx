import { useContext } from 'react';

import styled from 'styled-components';
import { vars } from 'token';

import { CalendarDay } from './Calendar.day';
import { CalendarMonth } from './Calendar.month';
import { CalendarContext } from './Calendar.provider';
import { CalendarWeek } from './Calendar.week';

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 1px solid ${vars.sementic.color.black10};
  border-radius: 12px;
  flex-direction: column;
  padding: 20px;
  overflow-x: auto;
  background: white;
  height: 100%;
`;

export const CalendarContent = () => {
  const { type } = useContext(CalendarContext);

  return (
    <ContentContainer>
      {type === 'day' && <CalendarDay />}
      {type === 'week' && <CalendarWeek />}
      {type === 'month' && <CalendarMonth />}
    </ContentContainer>
  );
};
