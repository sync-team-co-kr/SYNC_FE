import { AxiosResByData } from '@customTypes/common';
import { ITask } from '@customTypes/task';
import { userApiInstance } from '@libs/axios/axios';
import { AxiosResponse } from 'axios';

/**
 * 업무 목록을 가져오는 API
 * @param projectId: number
 * @returns {
 * taskId: number;
 * title: string;
 * description: string;
 * startDate?: string;
 * endDate?: string;
 * status: number;
 * depth: number;
 * task: {
 *  totalCount: number;
 *  completedCount: number;
 * }
 * }[]
 */

export const getTaskList = async (projectId: number) => {
  const response: AxiosResponse<AxiosResByData<ITask[]>> =
    await userApiInstance.get(`/node2/api/task/v2`, {
      params: {
        projectId,
      },
    });
  return response.data.data;
};

/**
 * 단일 업무를 가져오는 API
 * @param taskId: number
 * @returns {
 * taskId: number;
 * title: string;
 * description: string;
 * startDate?: string;
 * endDate?: string;
 * status: number;
 * depth: number;
 * task: {
 *  totalCount: number;
 *  completedCount: number;
 * }
 * }
 */

export const getTask = async (taskId: number) => {
  const response: AxiosResponse<AxiosResByData<ITask[]>> =
    await userApiInstance.get(`/node2/api/task/v3`, {
      params: {
        taskId,
      },
    });

  const [task] = response.data.data;
  return task;
};

/**
 * 업무를 생성하는 API
 * @param createTaskFormData<FormData>: {
 * data {
 * projectId: number;
 * title: string;
 * description: string;
 * startDate?: string;
 * endDate?: string;
 * parentTaskId: number;
 * status: number;
 * }
 * images: File;
 * thumbnailImage: string;
 * }
 * @return {
 * projectId: number;
 * title: string;
 * description: string;
 * startDate?: number;
 * endDate?: number;
 * status: number;
 * parentTaskId: number;
 * thumbnailIcon?: string;
 * }
 */
export const createTask = async (createTaskFormData: FormData) => {
  await userApiInstance.post('/user/api/task/v1', createTaskFormData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getTaskChildren = async (taskId: number) => {
  return userApiInstance.get(`/api/task/v1/${taskId}`);
};

/**
 * 업무의 상태 변경(테스트, 검증 필요)
 * @param willUpdateTaskParams: {
 *    projectId: number;
 *    taskId: number;
 *    editedStatus: number;
 * }
 * @returns
 */

export const updateTaskStatus1 = async (updateStatusFormData: FormData) => {
  const response: AxiosResponse<
    AxiosResByData<Omit<ITask, 'progress' | 'depth'>>
  > = await userApiInstance.put('/user/api/task', updateStatusFormData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.data;
};

export const deleteTask = async (projectId: number, taskId: number) => {
  await userApiInstance.delete('user/api/task', {
    data: {
      projectId,
      taskId,
    },
  });
  return taskId;
};
