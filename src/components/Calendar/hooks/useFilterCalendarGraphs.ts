import { useEffect, useMemo, useState } from 'react';

import sortGraphs from '@components/Calendar//utils/sortGraphs';
import filtertasksWithinWeek from '@components/Calendar/utils/filtertasksWithinWeek';
import findTasksEachDays from '@components/Calendar/utils/findTasksEachDays';
import { ICalendarDay } from '@customTypes/calendar';
import { ITask } from '@customTypes/task';
import { differenceInDays } from 'date-fns';

interface ISchedule {
  schedules: (ITask | null)[];
  calendarDay: ICalendarDay;
}

type useFilterCalendarGraphsType = (
  calendarDays: ICalendarDay[],
  tasks?: ITask[],
) => ISchedule[] | null;

const useFilterCalendarGraphs: useFilterCalendarGraphsType = (
  calendarDays,
  tasks,
) => {
  const [calendarItems, setCalendarItems] = useState<ISchedule[] | null>(null);
  const memorizedTasks = useMemo(
    () => tasks?.map((task) => task.taskId).join(','),
    [tasks?.map((task) => task.taskId).join(',')],
  );

  useEffect(() => {
    if (calendarDays.length < 0) return;
    const aa = filtertasksWithinWeek(calendarDays, tasks);

    if (!aa) return;
    const taskSchedulesOf3OrMore = aa.filter(
      (task) => differenceInDays(task.endDate, task.startDate) >= 3,
    );

    const sortedTasks = sortGraphs(taskSchedulesOf3OrMore);

    const graphs = findTasksEachDays(sortedTasks, calendarDays);
    console.log(calendarDays[0].formatDay);
    setCalendarItems(graphs);
  }, [memorizedTasks, calendarDays[0].formatDay]);

  return calendarItems;
};

export default useFilterCalendarGraphs;
