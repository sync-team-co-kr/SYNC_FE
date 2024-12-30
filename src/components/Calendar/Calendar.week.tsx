import { useContext, useEffect, useState } from 'react';

import { useTaskState } from '@libs/store/task/task';
import { useGetProjectIds } from '@services/project/Project.hooks';
import { useGetTasks } from '@services/task';
import {
  differenceInDays,
  eachDayOfInterval,
  endOfWeek,
  format,
  getTime,
  isWithinInterval,
  startOfWeek,
} from 'date-fns';
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
  padding: 18px 0;
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

interface TempTask {
  taskId: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  depth: number;
  progress: number;
  status: number;
}

interface ISchedule {
  schedules: (TempTask | null)[];
  calendarDay: {
    date: Date;
    formatDay: string;
  };
}

export const CalendarWeek = () => {
  const { value } = useContext(CalendarContext);

  const calendarDays = getCalendarDays(value);

  const { project } = useTaskState();
  const { projectIds } = useGetProjectIds();

  const { tasks } =
    useGetTasks(project.title !== '' ? project.projectId : projectIds) ?? {};

  const [calendarItems, setCalendarItems] = useState<ISchedule[] | null>(null);

  useEffect(() => {
    // 캘린더의 주중 일자 하나 이상 포함되는 업무의 일정만 필터링하기
    const aa = tasks?.filter((task) => {
      const interval = {
        start: new Date(task.startDate),
        end: new Date(task.endDate),
      };
      const test = calendarDays.some((calendarDay) =>
        isWithinInterval(calendarDay.date, interval),
      );
      return test;
    });

    if (aa) {
      const graphs = aa.filter(
        (task) => differenceInDays(task.endDate, task.startDate) >= 3,
      );

      /**
       * 업무 그래프 정렬 순서
       * 업무 속성 깊이가 낮은 순 (task의 perantTaskId 속성 요청해야 할 듯.)
       * 종료 일정이 빠른 순
       * 생성일이 빠른 순(createdAt 속성을 가져올 수 있는 지 여쭤봐야 합니다.)
       * 제목의 가나다 순
       */
      const sortedGraphs = graphs.sort((firstGraph, secondGraph) => {
        if (getTime(firstGraph.endDate) !== getTime(secondGraph.endDate)) {
          return getTime(firstGraph.endDate) - getTime(secondGraph.endDate);
        }
        return firstGraph.title <= secondGraph.title ? -1 : 1;
      });

      // 주중 일자마다 필터링된 업무의 일정이 포함되는지 확인 => 없으면 null 반환
      const bb = calendarDays.map((calendarDay) => {
        const taskSchedules = sortedGraphs.map((graph) => {
          const interval = {
            start: new Date(graph.startDate),
            end: new Date(graph.endDate),
          };
          if (isWithinInterval(calendarDay.date, interval)) return { ...graph };
          return null;
        });

        return {
          schedules: taskSchedules,
          calendarDay,
        };
      });

      setCalendarItems(bb);
    }
  }, [calendarDays[0].formatDay]);

  if (!calendarItems) return <></>;
  return (
    <GridContainer>
      {calendarItems.map(({ schedules, calendarDay }) => (
        <GridItem key={calendarDay.date?.toString()}>
          <GridItemHeader>{calendarDay.formatDay}</GridItemHeader>
          <GridContentWrap>
            <GridContents
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

/*
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
*/
