import { useEffect, useMemo, useState } from 'react';

import getInterval from '@components/Calendar/utils/getInterval';
import { ITask } from '@customTypes/task';
import convertSharp from '@utils/date/convertSharp';
import { isSameDay, isWithinInterval } from 'date-fns';

interface DayCalendarItem {
  allDaySchedules: ITask[] | null;
  daySchedules: ITask[] | null;
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
        const end = convertSharp(new Date(task.endDate));
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
          if (
            new Date(task.startDate).getHours() === 0 &&
            new Date(task.startDate).getMinutes() === 0 &&
            new Date(task.endDate).getHours() === 23 &&
            new Date(task.endDate).getMinutes() === 59
          ) {
            allDaySchedules.push(task);
          } else if (
            !isSameDay(currentDay, task.startDate) &&
            !isSameDay(currentDay, task.endDate)
          ) {
            allDaySchedules.push(task);
          } else if (
            isSameDay(currentDay, task.startDate) &&
            !isSameDay(currentDay, task.endDate) &&
            new Date(task.startDate).getHours() === 0 &&
            new Date(task.startDate).getMinutes() === 0
          ) {
            allDaySchedules.push(task);
          } else if (
            isSameDay(currentDay, task.endDate) &&
            !isSameDay(currentDay, task.startDate) &&
            new Date(task.endDate).getHours() === 23 &&
            new Date(task.endDate).getMinutes() === 59
          ) {
            allDaySchedules.push(task);
          } else {
            daySchedules.push(task);
          }
          return [allDaySchedules, daySchedules];
        },
        [[], []],
      );

      setCalendarItem((prevState) => ({
        ...prevState,
        allDaySchedules: [...schedules[0]],
        daySchedules: [...schedules[1]],
      }));
    }
  }, [memorizedTasks, currentDay]);

  return calendarItem;
};

export default useFilterDayCalendarTimeTables;
