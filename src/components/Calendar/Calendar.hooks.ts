import { useGetProjectIdList } from '@services/project/Project.hooks';
import { useGetTasks } from '@services/task/Task.hooks';

import { getSchedulesForTimeSlot } from './Calendar.utils';

export function useRenderTaskFilter() {
  const { projectIdsList } = useGetProjectIdList() ?? {};
  const { tasks } = useGetTasks(projectIdsList);
}
