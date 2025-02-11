import { useEffect, useMemo, useState } from 'react';

import { ICalendarDay } from '@customTypes/calendar';
import { ITask } from '@customTypes/task';
import filterTasksWithinWeek from '@pages/Calendars/utils/filterTasksWithinWeek';
import findTasksEachDays from '@pages/Calendars/utils/findTasksEachDays';
import sortGraphs from '@pages/Calendars/utils/sortGraphs';
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

    const tasksIncludeOnWeek = filterTasksWithinWeek(calendarDays, tasks);

    if (!tasksIncludeOnWeek) return;
    const taskSchedulesOf3OrMore = tasksIncludeOnWeek.filter(
      (task) => differenceInDays(task.endDate, task.startDate) >= 3,
    );

    const sortedTasks = sortGraphs(taskSchedulesOf3OrMore);

    const graphs = findTasksEachDays(sortedTasks, calendarDays);
    setCalendarItems(graphs);
  }, [memorizedTasks, calendarDays[0].formatDay]);

  return calendarItems;
};

export default useFilterCalendarGraphs;
