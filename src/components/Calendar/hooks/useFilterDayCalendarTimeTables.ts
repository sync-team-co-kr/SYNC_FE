import { useEffect, useMemo, useState } from 'react';

import getInterval from '@components/Calendar/utils/getInterval';
import { ITask } from '@customTypes/task';
import convertSharp from '@utils/date/convertSharp';
import { isWithinInterval } from 'date-fns';

type useFilterDayCalendarTimeTablesType = (
  currentDay: Date,
  tasks?: ITask[],
) => ITask[] | null;

const useFilterDayCalendarTimeTables: useFilterDayCalendarTimeTablesType = (
  currentDay,
  tasks,
) => {
  const [calendarItem, setCalendarItem] = useState<ITask[] | null>(null);
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
      setCalendarItem(tasksIncludeCurrentDay);
    }
  }, [memorizedTasks, currentDay]);

  return calendarItem;
};

export default useFilterDayCalendarTimeTables;
