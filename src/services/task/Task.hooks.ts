import { useQuery } from '@tanstack/react-query';

import { getTask } from './apis';

export const useGetTask = () => {
  const { data: taskList } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => getTask(),
  });

  return { taskList };
};
