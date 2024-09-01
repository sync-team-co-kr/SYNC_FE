import { CreateTaskRequestDto } from '@services/swagger/output/data-contracts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTask } from './apis';

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: (newTask: CreateTaskRequestDto) => createTask(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { createTaskMutate: createTaskMutation.mutate };
};
