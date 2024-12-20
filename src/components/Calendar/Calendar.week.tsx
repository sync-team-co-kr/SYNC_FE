import { useContext } from 'react';

import { useTaskState } from '@libs/store/task/task';
import { useGetProjectIds } from '@services/project/Project.hooks';
import { useGetTasks } from '@services/task';
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns';
import { ko } from 'date-fns/locale';
import styled from 'styled-components';
import { vars } from 'token';

import GridContents from './Calendar.gridContents';
import { CalendarContext } from './Calendar.provider';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(1, 2fr);
  width: 100%;
  height: 700px;

  & > div {
    border-right: 1px solid ${vars.sementic.color.black10};
    border-bottom: 1px solid ${vars.sementic.color.black10};
  }

  & > div:nth-child(7n) {
    border-right: none;
    color: ${vars.sementic.color.black20};
  }

  & > div:nth-child(1) {
    color: ${vars.sementic.color.black20};
  }

  & > div:nth-child(-n + 7) {
    border-top: none;
  }

  & > div:nth-last-child(-n + 7) {
    border-bottom: none;
  }
`;

const GridItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GridItemHeader = styled.div`
  padding: 10px 0;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${vars.sementic.color.black10};
`;

const GridContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 18px 10px;
  width: 100%;
  height: 100%;
`;

const getCalendarDays = (date: Date) => {
  const startDate = startOfWeek(date);
  const endDate = endOfWeek(date);

  const startOfGrid = startOfWeek(startDate, { weekStartsOn: 0 }); // 0 = 일요일
  const endOfGrid = endOfWeek(endDate, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start: startOfGrid, end: endOfGrid });

  const calendarDays = days.map((day) => ({
    date: day,
    formatDay: format(day, 'd E', { locale: ko }),
  }));

  return calendarDays;
};

export const CalendarWeek = () => {
  const { value } = useContext(CalendarContext);

  const calendarDays = getCalendarDays(value);

  const { project } = useTaskState();
  const { projectIds } = useGetProjectIds();

  const { tasks } =
    useGetTasks(project.title !== '' ? project.projectId : projectIds) ?? {};

  return (
    <GridContainer>
      {calendarDays.map((day) => (
        <GridItem key={day?.date?.toString()}>
          <GridItemHeader>{day?.formatDay}</GridItemHeader>
          <GridContentWrap>
            <GridContents tasks={tasks} gridDay={day} />
          </GridContentWrap>
        </GridItem>
      ))}
    </GridContainer>
  );
};
