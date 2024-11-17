import { CreateTaskPayload } from '@services/swagger/output/data-contracts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createTask,
  deleteTask,
  getTaskChildren,
  getTaskList,
  updateTaskStatus,
} from './apis';

// 업무 리스트 가져오는 Hook


export const useGetTasks = (projectId?: number[] | number) => {
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
      if (projectId) {
        const result = await getTaskList(projectId);
        return result.data.data;
      }
      return [];
    },
    enabled: !!projectId,
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

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();
  const updateTaskStatusMutation = useMutation({
    mutationFn: (willUpdateTaskParams: {
      projectId: number;
      taskId: number;
      editedStatus: number;
    }) => updateTaskStatus(willUpdateTaskParams),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
  return { updateTaskStatusMutate: updateTaskStatusMutation.mutate };
};

// 업무 삭제 hook
export const useDeleteTask = (projectId: number, taskId: number) => {
  const queryClient = useQueryClient();
  const deleteTaskMutation = useMutation({
    mutationFn: () => deleteTask(projectId, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return { deleteTaskMutate: deleteTaskMutation.mutate };
};
