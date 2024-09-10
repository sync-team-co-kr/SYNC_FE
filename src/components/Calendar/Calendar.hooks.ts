import { useEffect, useState } from 'react';

import { useTaskFilterState } from '@libs/store/task/calendar';
import { WorkTags } from '@libs/store/task/types';

import { TaskData } from './Calendar.types';

export function useRenderTaskFilter(schedules: TaskData[]) {
  const [filteredSchedules, setFilteredSchedules] = useState<TaskData[]>([]);
  const { workState, situationState } = useTaskFilterState();

  const statusNumber: Record<number, WorkTags> = {
    0: 'task',
    1: 'subTask',
    2: 'quest',
  };

  useEffect(() => {
    const filtered = schedules.filter((schedule) => {
      const isWorkState =
        workState.length === 0 ||
        (schedule.status in statusNumber &&
          workState.includes(statusNumber[schedule.status]));

      return isWorkState;
    });

    setFilteredSchedules(filtered);
  }, [workState, situationState, schedules]);

  return {
    filteredSchedules,
  };
}
