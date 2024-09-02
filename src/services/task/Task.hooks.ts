import { CreateTaskRequestDto } from '@services/swagger/output/data-contracts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createTask, getTaskChildren } from './apis';

// 업무 생성 Hook
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: (newTask: CreateTaskRequestDto) =>
      createTask({
        data: newTask,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { createTaskMutate: createTaskMutation.mutate };
};

// 프로젝트 자식 업무 가져오는 hook

export const useGetTaskChildren = (taskId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => getTaskChildren(taskId),
  });

  return { taskChildren: data, isLoading, error };
};
