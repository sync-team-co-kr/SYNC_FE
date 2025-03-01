import { ICalendarDay } from '@customTypes/calendar';
import { ITask } from '@customTypes/task';
import convertSharp from '@utils/date/convertSharp';
import { isWithinInterval } from 'date-fns';

import getInterval from './getInterval';

// 주중 일자마다 필터링된 업무의 일정이 포함되는지 확인
const findTasksEachDays = (tasks: ITask[], calendarDays: ICalendarDay[]) => {
  const graphs = calendarDays.map((calendarDay) => {
    const taskSchedulesEachDays = tasks.map((graph) => {
      const start = convertSharp(new Date(graph.startDate));
      const end = convertSharp(new Date(graph.endDate));
      const interval = getInterval(start.toISOString(), end.toISOString());
      if (isWithinInterval(calendarDay.date, interval)) return { ...graph };
      return null;
    });

    return {
      schedules: taskSchedulesEachDays,
      calendarDay,
    };
  });

  return graphs;
};

export default findTasksEachDays;
