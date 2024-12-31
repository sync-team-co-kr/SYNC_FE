import { useEffect, useState } from 'react';

import sortGraphs from '@components/Calendar//utils/sortGraphs';
import filtertasksWithinWeek from '@components/Calendar/utils/filtertasksWithinWeek';
import findTasksEachDays from '@components/Calendar/utils/findTasksEachDays';
import { differenceInDays } from 'date-fns';

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

type useFilterCalendarGraphsType = (
  calendarDays: {
    date: Date;
    formatDay: string;
  }[],
  tasks?: TempTask[],
) => ISchedule[] | null;

const useFilterCalendarGraphs: useFilterCalendarGraphsType = (
  calendarDays,
  tasks,
) => {
  const [calendarItems, setCalendarItems] = useState<ISchedule[] | null>(null);

  useEffect(() => {
    const aa = filtertasksWithinWeek(calendarDays, tasks);

    if (!aa) return;
    const tasks3OrMore = aa.filter(
      (task) => differenceInDays(task.endDate, task.startDate) >= 3,
    );

    const sortedTasks = sortGraphs(tasks3OrMore);

    // 주중 일자마다 필터링된 업무의 일정이 포함되는지 확인 => 없으면 null 반환
    const graphs = findTasksEachDays(sortedTasks, calendarDays);

    setCalendarItems(graphs);
  }, [calendarDays[0].formatDay]);

  return calendarItems;
};

export default useFilterCalendarGraphs;
