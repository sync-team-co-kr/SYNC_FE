import { ICalendarDay } from '@customTypes/calendar';
import { ITask } from '@customTypes/task';
import { isWithinInterval } from 'date-fns';

import getInterval from './getInterval';

// 주중에 업무 일정이 하나라도 포함되어있는 업무 목록 필터링하기
const filtertasksWithinWeek = (
  calendarDays: ICalendarDay[],
  tasks?: ITask[],
) => {
  const tasksWillPlaceWeekCalendar = tasks?.filter((task) => {
    const interval = getInterval(task.startDate, task.endDate);
    const isIncludededTasksWithInWeek = calendarDays.some((calendarDay) =>
      isWithinInterval(calendarDay.date, interval),
    );

    return isIncludededTasksWithInWeek;
  });
  return tasksWillPlaceWeekCalendar;
};

export default filtertasksWithinWeek;
