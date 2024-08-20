import { useContext } from 'react';

import { Typography } from '@components/common/Typography';
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import styled from 'styled-components';
import { vars } from 'token';

import { CalendarContext } from './Calendar.provider';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  width: 100%;
  height: 100%;

  & > div {
    border-right: 1px solid ${vars.sementic.color.black10};
    border-bottom: 1px solid ${vars.sementic.color.black10};
  }

  & > div:nth-child(7n) {
    border-right: none;
  }

  & > div:nth-child(1n) {
    border-left: none;
  }

  & > div:nth-child(-n + 7) {
    border-top: none;
  }

  & > div:nth-last-child(-n + 7) {
    border-bottom: none;
  }
`;

const GridItemHeader = styled.div`
  padding: 6px 14px;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

const GridContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 10px;
  width: 100%;
  height: 118px;
  overflow-y: auto;
`;

const GridItem = styled.div`
  width: 100%;
  height: 100%;
`;

const getCalendarDays = (date: Date) => {
  const startDate = startOfMonth(date);
  const endDate = endOfMonth(date);

  const startOfGrid = startOfWeek(startDate, { weekStartsOn: 0 }); // 0 = 일요일
  const endOfGrid = endOfWeek(endDate, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start: startOfGrid, end: endOfGrid });

  const calendarDays = days.map((day) => ({
    date: day,
    dayOfWeek: format(day, 'E', { locale: ko }),
  }));

  const totalCells = 35;
  return calendarDays.length < totalCells
    ? [...calendarDays, ...Array(totalCells - calendarDays.length).fill(null)]
    : calendarDays;
};

export const CalendarMonth = () => {
  const { value } = useContext(CalendarContext); // 현재 날자

  const calendarDays = getCalendarDays(value);

  return (
    <GridContainer>
      {calendarDays.map((day, index) => (
        <GridItem key={index}>
          <GridItemHeader>
            {index < 7 ? (
              <>
                <Typography
                  variant="small-text"
                  color={
                    index % 7 === 0 || index % 7 === 6 ? 'black20' : 'black'
                  }
                >
                  {format(day.date, 'd')}
                </Typography>{' '}
                <Typography
                  variant="small-text"
                  color={
                    index % 7 === 0 || index % 7 === 6 ? 'black20' : 'black'
                  }
                >
                  {day.dayOfWeek}
                </Typography>
              </>
            ) : (
              day && (
                <Typography
                  variant="small-text"
                  color={
                    index % 7 === 0 || index % 7 === 6 ? 'black20' : 'black'
                  }
                >
                  {format(day.date, 'd')}
                </Typography>
              )
            )}
          </GridItemHeader>
          <GridContent></GridContent>
        </GridItem>
      ))}
    </GridContainer>
  );
};
