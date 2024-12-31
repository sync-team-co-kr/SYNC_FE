import { isWithinInterval } from 'date-fns';

import getInterval from './getInterval';

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

// 주중에 업무 일정이 하나라도 포함되어있는 업무 목록 필터링하기
const filtertasksWithinWeek = (
  calendarDays: {
    date: Date;
    formatDay: string;
  }[],
  tasks?: TempTask[],
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
