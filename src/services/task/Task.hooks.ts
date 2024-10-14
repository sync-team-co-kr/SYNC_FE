import { CreateTaskPayload } from '@services/swagger/output/data-contracts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createTask, getTaskChildren, getTaskList } from './apis';

// 업무 리스트 가져오는 Hook

export const useGetTasks = (projectId: number[] | number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: Array.isArray(projectId)
      ? ['taskList', ...projectId]
      : ['task', projectId],
    queryFn: async () => {
      if (Array.isArray(projectId)) {
        const result = await Promise.all(
          projectId.map((id) => getTaskList(id)),
        );
        return result.map((res) => res.data).flatMap((task) => task.data) ?? [];
      }
      const result = await getTaskList(projectId);
      return result.data.data;
    },
  });

  return { tasks: data, isLoading, error };
};

// 업무 생성 Hook
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: (newTask: CreateTaskPayload) =>
      createTask({
        data: newTask.data,
        images: newTask.images,
        thumbnailImage: newTask.thumbnailImage,
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
