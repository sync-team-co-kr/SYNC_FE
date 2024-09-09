import { useEffect, useState } from 'react';

import { useTaskFilterState } from '@libs/store/task/calendar';
import { WorkTags } from '@libs/store/task/types';

import { getSchedulesForTimeSlot } from './Calendar.utils';

const statusNumber: Record<number, WorkTags> = {
  0: 'task',
  1: 'subTask',
  2: 'quest',
};
export function useRenderTaskFilter(schedules: any[] | undefined, value: Date) {
  const [filteredSchedules, setFilteredSchedules] = useState<any[]>([]);
  const { workState, situationState } = useTaskFilterState();

  useEffect(() => {
    if (!schedules) return;
    const sortSchedules = getSchedulesForTimeSlot(schedules, value);
    const filtered = sortSchedules.filter((schedule) => {
      const isWorkState =
        workState.length === 0 ||
        (schedule.status in statusNumber &&
          workState.includes(statusNumber[schedule.status]));

      return isWorkState;
    });

    setFilteredSchedules(filtered);
  }, [workState, situationState, schedules, value]);

  return filteredSchedules;
}
