import { useDraggingTempTaskActions } from '@libs/store/task/draggingTempTask';
import { CreateTaskPayload } from '@services/swagger/output/data-contracts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import convertBase64ToFile from '@utils/file/convertBase64ToFile';
import extractImageUrls from '@utils/file/extractImageUrls';
import getExtensionFromMimeType from '@utils/file/getExtensionFromMimeType';
import randomUuid from '@utils/file/getRandomUuid';

import {
  createTask,
  deleteTask,
  getTask,
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
  const { data, isFetching, error } = useQuery({
    queryKey: Array.isArray(projectId)
      ? ['taskList', ...projectId]
      : ['task', projectId],
    queryFn: async () => {
      if (Array.isArray(projectId)) {
        const result = await Promise.all(
          projectId.map((id) => getTaskList(id)),
        );
        return result.map((res) => res).flatMap((task) => task) ?? [];
      }
      if (projectId) {
        const result = await getTaskList(projectId);
        return result;
      }
      return [];
    },
    enabled: !!projectId,
  });

  return { tasks: data, isFetching, error };
};

// 업무 생성 Hook
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const addTaskMutation = useMutation({
    mutationFn: async (newTask: CreateTaskParams) => {
      const formData = new FormData();
      const imageUrls = extractImageUrls(newTask.data.description);

      let updatedDescription = newTask.data.description;
      imageUrls.forEach((imageUrl) => {
        if (imageUrl.startsWith('data:image/')) {
          const uuid = randomUuid();
          const prevFileName = 'description-image';
          const extension = getExtensionFromMimeType(imageUrl);

          const newImageName = `${uuid}_${prevFileName}`;
          const newImageUrl = `https://user.sync-team.co.kr:30443/api/task/image?filename=/mnt/oraclevdb/task/description/${newImageName}.${extension}`;
          updatedDescription = updatedDescription?.replace(
            imageUrl,
            newImageUrl,
          );

          try {
            const imgFile = convertBase64ToFile(imageUrl, newImageName);
            formData.append(`images`, imgFile);
          } catch (error) {
            console.error('이미지 변환 실패', error);
          }
        } else {
          console.log('이미지가 포함되지 않았습니다');
        }
      });

      const { thumbnailIcon, ...payload } = newTask.data;
      const formDataList: CreateTaskPayload['data'] = payload;
      const newTaskBlob = new Blob([JSON.stringify(formDataList)], {
        type: 'application/json',
      });

      if (thumbnailIcon) {
        formDataList.thumbnailIcon = thumbnailIcon;
      }

      formData.append('data', newTaskBlob);
      if (newTask.thumbnailImage) {
        formData.append('thumbnailImage', newTask.thumbnailImage);
      }

      await createTask(formData);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { createTaskMutate: addTaskMutation.mutate };
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
      const task = await getTask(taskId);

      const formData = new FormData();
      const updateStatusTaskBlobPart = {
        ...task,
        taskId: task.id,
        projectId,
        status: editedStatus,
      };
      const updateStatusTaskBlob = new Blob(
        [JSON.stringify(updateStatusTaskBlobPart)],
        {
          type: 'application/json',
        },
      );
      formData.append('data', updateStatusTaskBlob);

      const updatedStatusTask = await updateTaskStatus(formData);

      return {
        projectId,
        taskId: updatedStatusTask.taskId,
        editedStatus,
      };
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: ['task', data.projectId],
      });

      const oldTasks = await getTaskList(data.projectId);
      const newTasks = oldTasks.map((oldTask) =>
        oldTask.taskId === data.taskId
          ? { ...oldTask, status: data.editedStatus }
          : { ...oldTask },
      );

      queryClient.setQueryData(['task', data.projectId], () => newTasks);
      setOriginalTasks(newTasks);
    },
  });

  return { updateTaskStatusMutate: updateTaskStatusMutation.mutate };
};

// 업무 삭제 hook
export const useDeleteTask = (projectId: number, taskId: number) => {
  const queryClient = useQueryClient();
  const deleteTaskMutation = useMutation({
    mutationFn: () => deleteTask(projectId, taskId),
    onSuccess: (willDeleteTaskId) => {
      queryClient.invalidateQueries({ queryKey: ['tasks', willDeleteTaskId] });
    },
  });

  return { deleteTaskMutate: deleteTaskMutation.mutate };
};
