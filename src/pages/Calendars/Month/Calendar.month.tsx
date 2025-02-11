import { useContext } from 'react';

import MonthGridContents from '@components/Calendar/Calendar.monthGrids';
import { Typography } from '@components/common/Typography';
import useFilterSearchQuery from '@hooks/useFilterSearchQuery';
import { useTaskState } from '@libs/store/task/task';
import { CalendarContext } from '@pages/Calendars/Calendar.provider';
import useFilterCalendarGraphs from '@pages/Calendars/hooks/useFilterCalendarGraphs';
import { useGetProjectIds } from '@services/project/Project.hooks';
import { useGetTasks } from '@services/task';
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
  justify-content: space-between;
`;

const GridContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 18px 0;
  width: 100%;
  height: 100%;
`;

const GridItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const getCalendarDays = (date: Date) => {
  const startDate = startOfMonth(date);
  const endDate = endOfMonth(date);

  const startOfGrid = startOfWeek(startDate, { weekStartsOn: 0 }); // 0 = 일요일
  const endOfGrid = endOfWeek(endDate, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start: startOfGrid, end: endOfGrid });

  const calendarDays = days.map((day) => ({
    date: day,
    formatDay: format(day, 'd E', { locale: ko }),
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

  const { project } = useTaskState();
  const { projectIds } = useGetProjectIds();

  const { tasks } =
    useGetTasks(project.title !== '' ? project.projectId : projectIds) ?? {};

  const searchQueryResult = useFilterSearchQuery(tasks);

  const calendarItems = useFilterCalendarGraphs(
    calendarDays,
    searchQueryResult || tasks,
  );

  if (!calendarItems) return <></>;
  return (
    <GridContainer>
      {calendarItems.map(({ schedules, calendarDay }, index) => (
        <GridItem key={calendarDay.date.toString()}>
          <GridItemHeader>
            {index < 7 ? (
              <>
                <Typography
                  variant="small-text"
                  color={
                    index % 7 === 0 || index % 7 === 6 ? 'black20' : 'black'
                  }
                >
                  {format(calendarDay.date, 'd')}
                </Typography>{' '}
                <Typography
                  variant="small-text"
                  color={
                    index % 7 === 0 || index % 7 === 6 ? 'black20' : 'black'
                  }
                >
                  {calendarDay.formatDay}
                </Typography>
              </>
            ) : (
              calendarDay && (
                <Typography
                  variant="small-text"
                  color={
                    index % 7 === 0 || index % 7 === 6 ? 'black20' : 'black'
                  }
                >
                  {format(calendarDay.date, 'd')}
                </Typography>
              )
            )}
          </GridItemHeader>
          <GridContentWrap>
            <MonthGridContents
              schedules={schedules}
              tasks={tasks}
              gridDay={calendarDay}
            />
          </GridContentWrap>
        </GridItem>
      ))}
    </GridContainer>
  );
};
