import { useEffect, useMemo, useState } from 'react';

import getInterval from '@components/Calendar/utils/getInterval';
import { ITask } from '@customTypes/task';
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
        const interval = getInterval(task.startDate, task.endDate);
        return isWithinInterval(currentDay, interval);
      });
      setCalendarItem(tasksIncludeCurrentDay);
    }
  }, [memorizedTasks, currentDay]);

  return calendarItem;
};

export default useFilterDayCalendarTimeTables;
