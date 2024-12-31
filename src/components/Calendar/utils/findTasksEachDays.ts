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

// 주중 일자마다 필터링된 업무의 일정이 포함되는지 확인
const findTasksEachDays = (
  tasks: TempTask[],
  calendarDays: {
    date: Date;
    formatDay: string;
  }[],
) => {
  const graphs = calendarDays.map((calendarDay) => {
    const taskSchedulesEachDays = tasks.map((graph) => {
      const interval = getInterval(graph.startDate, graph.endDate);
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
