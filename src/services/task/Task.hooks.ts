import { useDraggingTempTaskActions } from '@libs/store/task/draggingTempTask';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createTask,
  deleteTask,
  getTaskChildren,
  getTaskList,
  updateTaskStatus,
} from './apis';

interface CreateTaskParams {
  thumbnailImage?: string;
  images?: string[];
  data: {
    description?: string;
    endDate?: string;
    startDate?: string;
    title: string;
    thumbnailIcon?: string;
    parentTaskId?: number;
    projectId: number;
    status: number;
  };
}

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
    mutationFn: (newTask: CreateTaskParams) =>
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
  const { setOriginalTasks } = useDraggingTempTaskActions();
  const updateTaskStatusMutation = useMutation({
    mutationFn: async (willUpdateTaskParams: {
      projectId: number;
      taskId: number;
      editedStatus: number;
    }) => {
      const { projectId, taskId, editedStatus } = willUpdateTaskParams;
      await updateTaskStatus(willUpdateTaskParams);
      const tasksBeforeUpdated = await getTaskList(projectId);
      return {
        tasks: tasksBeforeUpdated.data.data,
        taskId,
        editedStatus,
      };
    },
    onSuccess: (data) => {
      const updatedTasks = data.tasks.map((task) =>
        task.taskId === data.taskId
          ? { ...task, status: data.editedStatus }
          : { ...task },
      );

      setOriginalTasks(updatedTasks);

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
