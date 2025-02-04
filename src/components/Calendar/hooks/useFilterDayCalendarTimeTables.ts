import { useEffect, useMemo, useState } from 'react';

import { ITask } from '@customTypes/task';
import getInterval from '@pages/Calendars/utils/getInterval';
import convertSharp from '@utils/date/convertSharp';
import {
  getHours,
  isSameDay,
  isWithinInterval,
  setHours,
  setMinutes,
} from 'date-fns';

interface DayCalendarItem {
  allDaySchedules: ITask[] | null;
  daySchedules: {
    timeslot: number;
    timeTables: ITask[] | null;
  }[];
}

type useFilterDayCalendarTimeTablesType = (
  currentDay: Date,
  tasks?: ITask[],
) => DayCalendarItem;

const timeslots = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];

const useFilterDayCalendarTimeTables: useFilterDayCalendarTimeTablesType = (
  currentDay,
  tasks,
) => {
  const [calendarItem, setCalendarItem] = useState<DayCalendarItem>({
    allDaySchedules: [],
    daySchedules: [],
  });
  const memorizedTasks = useMemo(
    () => tasks?.map((task) => task.taskId).join(','),
    [tasks?.map((task) => task.taskId).join(',')],
  );

  useEffect(() => {
    if (tasks) {
      const tasksIncludeCurrentDay = tasks?.filter((task) => {
        const start = convertSharp(new Date(task.startDate));
        const end = setHours(
          setMinutes(convertSharp(new Date(task.endDate)), 59),
          23,
        );
        const interval = getInterval(start.toISOString(), end.toISOString());
        return isWithinInterval(currentDay, interval);
      });

      /**
       * ## 종일에 배치되는 조건
       * - 업무의 시작 시간이 00:00, 종료 시간이 23:59일 때(날짜 지정 시 시간 기본값)
       * - 캘린더의 현재 날짜가 업무의 시작 시간, 종료 시간과 다를 때
       * - 캘린더의 현재 날짜가 업무의 시작일이지만 종료일과 다르고 시작 시간이 00:00일 때
       * - 캘린더의 현재 날짜가 업무의 종료일이지만 시작일과 다르고 종료 시간이 23:59일 때
       *
       */

      const schedules = tasksIncludeCurrentDay.reduce<[ITask[], ITask[]]>(
        ([allDaySchedules, daySchedules], task) => {
          const dayTypeStart = new Date(task.startDate);
          const dayTypeEnd = new Date(task.endDate);

          if (
            dayTypeStart.getHours() === 0 &&
            dayTypeStart.getMinutes() === 0 &&
            dayTypeEnd.getHours() === 23 &&
            dayTypeEnd.getMinutes() === 59
          ) {
            allDaySchedules.push(task);
          } else if (
            !isSameDay(currentDay, dayTypeStart) &&
            !isSameDay(currentDay, dayTypeEnd)
          ) {
            allDaySchedules.push(task);
          } else if (
            isSameDay(currentDay, dayTypeStart) &&
            !isSameDay(currentDay, dayTypeEnd) &&
            dayTypeStart.getHours() === 0 &&
            dayTypeStart.getMinutes() === 0
          ) {
            allDaySchedules.push(task);
          } else if (
            isSameDay(currentDay, dayTypeEnd) &&
            !isSameDay(currentDay, dayTypeStart) &&
            dayTypeEnd.getHours() === 23 &&
            dayTypeEnd.getMinutes() === 59
          ) {
            allDaySchedules.push(task);
          } else {
            daySchedules.push(task);
          }
          return [allDaySchedules, daySchedules];
        },
        [[], []],
      );

      /**
       * 캘린저의 날짜와 업무의 시작일과 일치하면
       * timeslot >= startDate.getHour();
       *
       * 캘린더의 날짜와 업무의 종료일과 일치하면
       * timeslot <= endDate.getHour();  <= 13
       */
      const timeTablesByHours = timeslots.map((timeslot) => {
        const timeTables = schedules[1].filter((schedule) => {
          if (
            isSameDay(currentDay, schedule.endDate) &&
            timeslot <= getHours(schedule.endDate)
          ) {
            return true;
          }
          if (
            isSameDay(currentDay, schedule.startDate) &&
            timeslot >= getHours(schedule.startDate)
          ) {
            return true;
          }
          return false;
        });
        return {
          timeslot,
          timeTables,
        };
      });

      setCalendarItem((prevState) => ({
        ...prevState,
        allDaySchedules: [...schedules[0]],
        daySchedules: [...timeTablesByHours],
      }));
    }
  }, [memorizedTasks, currentDay]);

  return calendarItem;
};

export default useFilterDayCalendarTimeTables;

/**
 * 12.03 02:16 ~ 12.07 13:59
 * 12.03 2, 3, 4, ... 23
 * 12.06 0, 1, 2, ... 13
 */
