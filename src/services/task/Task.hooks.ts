import { CreateTaskRequestDto } from '@services/swagger/output/data-contracts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createTask, getTaskChildren, getTaskList } from './apis';

// 업무 리스트 가져오는 Hook

export const useGetTasks = (projectId: number[]) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['tasks', projectId],
    queryFn: async () => {
      const result = await Promise.all(projectId.map((id) => getTaskList(id)));
      return result.map((res) => res.data);
    },
  });

  return { tasks: data, isLoading, error };
};

export const useGetTaskList = (projectId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['task'],
    queryFn: () => getTaskList(projectId),
  });

  return { task: data, isLoading, error };
};

// 업무 생성 Hook
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: (newTask: CreateTaskRequestDto) =>
      createTask({
        data: newTask,
        images: newTask.images,
        titleimage: newTask.images,
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
