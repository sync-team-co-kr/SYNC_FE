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
 *  id: number;
 *  title: string;
 *  description: string;
 *  startDate: string;
 *  endDate: string;
 *  depth: number;
 *  status: number;
 *  task: {
 *    totalCount: number;
 *    completedCount: number;
 *  };
 * }
 */

interface getTaskResponse {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  depth: number;
  status: number;
  task: {
    totalCount: number;
    completedCount: number;
  };
  subTasks: getTaskResponse[] | null;
}

export const getTask = async (taskId: number) => {
  const response: AxiosResponse<AxiosResByData<getTaskResponse>> =
    await userApiInstance.get(`/node2/api/task/v3`, {
      params: {
        taskId,
      },
    });

  return response.data.data;
};

export default interface GetTaskChildrenResponse {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  depth: number;
  status: number;
  task: {
    totalCount: number;
    completedCount: number;
  };
  subTasks: GetTaskChildrenResponse[] | null;
}

export const getTaskChildren = async (taskId?: number) => {
  const response: AxiosResponse<AxiosResByData<GetTaskChildrenResponse>> =
    await userApiInstance.get(`/node2/api/task/v1`, {
      params: {
        taskId,
      },
    });
  return response.data.data;
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

/**
 * 업무를 생성하는 API
 * @param updateTaskFormData<FormData>: {
 * data {
 * projectId: number;
 * taskId: number;
 * title: string;
 * description: string;
 * startDate?: string;
 * endDate?: string;
 * status: number;
 * thumbnailIcon?: string;
 * }
 * images?: File[];
 * deleteImages?: File[];
 * titleImage?: string;
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
export const updateTask = async (updateTaskFormData: FormData) => {
  const response = await userApiInstance.put(
    '/user/api/task',
    updateTaskFormData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  console.log(response);
};

/**
 * 업무의 상태 변경(테스트, 검증 필요)
 * @param willUpdateTaskParams: {
 *    projectId: number;
 *    taskId: number;
 *    editedStatus: number;
 * }
 * @return {
 * projectId: number;
 * taskId: number;
 * title: string;
 * description: string;
 * startDate: number;
 * endDate: number;
 * }
 */

export const updateTaskStatus = async (updateStatusFormData: FormData) => {
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
