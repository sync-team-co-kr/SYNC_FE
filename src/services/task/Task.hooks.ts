import { ITask } from '@customTypes/task';
import { useDraggingTempTaskActions } from '@libs/store/task/draggingTempTask';
import { CreateTaskPayload } from '@services/swagger/output/data-contracts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import convertBase64ToFile from '@utils/file/convertBase64ToFile';
import extractImageUrls from '@utils/file/extractImageUrls';
import getExtensionFromMimeType from '@utils/file/getExtensionFromMimeType';

import {
  createTask,
  deleteTask,
  getTask,
  getTaskChildren,
  getTaskList,
  updateTask,
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

interface UpdateTaskParams {
  data: {
    projectId: number;
    taskId: number;
    title: string;
    description?: string;
    status: number;
    startDate?: string;
    endDate?: string;
    thumbnailIcon?: string;
  };
  images?: string[];
  deleteImages?: File[];
  titleImage?: string;
}

// 업무 리스트 가져오는 Hook
export const useGetTasks = (projectId?: number[] | number) => {
  const { data, isFetching, error } = useQuery({
    queryKey: Array.isArray(projectId)
      ? ['tasks', ...projectId]
      : ['tasks', projectId],
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

export const useGetTask = (taskId: number) => {
  const { data, isFetching, error } = useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => {
      const task = await getTask(taskId);
      return task;
    },
    enabled: !!taskId,
  });

  return { task: data, isFetching, error };
};

// 프로젝트 자식 업무 가져오는 hook
export const useGetTaskChildren = (taskId?: number) => {
  const { data, isFetching, error } = useQuery({
    queryKey: ['subTasks', taskId],
    queryFn: async () => {
      const getTaskChildrenResponse = await getTaskChildren(taskId);
      const { id: aid, ...taskChildrenData } = getTaskChildrenResponse;
      const taskChildren = {
        taskId: getTaskChildrenResponse.id,
        ...taskChildrenData,
        subTasks: getTaskChildrenResponse.subTasks!.map((subTask) => {
          const { id: subTaskId, ...subTaskData } = subTask;
          return {
            taskId: subTask.id,
            ...subTaskData,
          };
        }),
      } as ITask;

      return taskChildren;
    },
    enabled: !!taskId,
  });

  return { taskChildren: data, isFetching, error };
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
          const uuid = crypto.randomUUID();
          const prevFileName = 'description-image';
          const mimeType =
            imageUrl.match(/data:(.*?);base64/)?.[1] || 'image/png';
          const extension = getExtensionFromMimeType(mimeType);

          const newImageName = `${uuid}_${prevFileName}`;
          const newImageUrl = `https://user.sync-team.co.kr:30443/node2/api/task/image?filename=/mnt/oraclevdb/task/description/${newImageName}.${extension}`;
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
      const formDataList: CreateTaskPayload['data'] = {
        ...payload,
        description: updatedDescription,
      };
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

// 업무 수정 hook
export const useUpdateTask = () => {
  const updateTaskMutation = useMutation({
    mutationFn: async (willUpdateTask: UpdateTaskParams) => {
      const formData = new FormData();
      const imageUrls = extractImageUrls(willUpdateTask.data.description);

      let updatedDescription = willUpdateTask.data.description;
      imageUrls.forEach((imageUrl) => {
        console.log(imageUrls);
        if (imageUrl.startsWith('data:image/')) {
          const uuid = crypto.randomUUID();
          const prevFileName = 'description-image';
          const mimeType =
            imageUrl.match(/data:(.*?);base64/)?.[1] || 'image/png';
          const extension = getExtensionFromMimeType(mimeType);

          const newImageName = `${uuid}_${prevFileName}`;
          const newImageUrl = `https://user.sync-team.co.kr:30443/node2/api/task/image?filename=/mnt/oraclevdb/task/description/${newImageName}.${extension}`;
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

      const { thumbnailIcon, ...payload } = willUpdateTask.data;
      const formDataList: UpdateTaskParams['data'] = {
        ...payload,
        description: updatedDescription,
      };

      const willUpdateTaskBlob = new Blob([JSON.stringify(formDataList)], {
        type: 'application/json',
      });

      if (thumbnailIcon) {
        formDataList.thumbnailIcon = thumbnailIcon;
      }

      formData.append('deleteImages', JSON.stringify([]));
      formData.append('titleImage', willUpdateTask.titleImage || '');
      formData.append('data', willUpdateTaskBlob);

      await updateTask(formData);
    },
  });

  return { updateTaskMutate: updateTaskMutation.mutate };
};

// 업무의 상태 변경 hook
export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();
  const { setOriginalTasks } = useDraggingTempTaskActions();

  const updateTaskStatusMutation = useMutation({
    mutationFn: async (willUpdateTaskParams: {
      projectId: number;
      taskId: number;
      editedStatus: number;
      oldTasks: ITask[];
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
        oldTasks: willUpdateTaskParams.oldTasks,
      };
    },
    onMutate: async (data) => {
      const { depth, parentTaskId } = data.oldTasks[0];
      const queryKeySoruce =
        depth === 0 ? ['task', data.projectId] : ['subTasks', parentTaskId];
      await queryClient.cancelQueries({
        queryKey: queryKeySoruce,
      });

      const newTasks = data.oldTasks.map((oldTask) =>
        oldTask.taskId === data.taskId
          ? { ...oldTask, status: data.editedStatus }
          : { ...oldTask },
      );

      queryClient.setQueryData(queryKeySoruce, () => newTasks);
      setOriginalTasks(newTasks);
    },
    onSettled: (data) => {
      const depth = data?.oldTasks[0].depth || 0;
      const parentTaskId = data?.oldTasks[0].parentTaskId || 0;
      const queryKeySoruce =
        depth === 0
          ? ['task', data?.projectId || 0]
          : ['subTasks', parentTaskId];
      console.log(queryKeySoruce);
      queryClient.invalidateQueries({
        queryKey: queryKeySoruce,
      });
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
