import { requiredJwtTokeninstance } from '@libs/axios/axios';
import { CreateTaskPayload } from '@services/swagger/output/data-contracts';

export const getTaskList = async (projectId: number) => {
  return requiredJwtTokeninstance.get(
    `http://150.136.153.235:31585/api/task/v2?projectId=${projectId}`,
  );
};

export const createTask = async ({ ...payload }: CreateTaskPayload) => {
  return requiredJwtTokeninstance.post('/user/api/task', {
    data: payload.data,
    images: payload.images,
    titleimage: payload.titleimage,
  });
};

export const getTaskChildren = async (taskId: number) => {
  return requiredJwtTokeninstance.get(`/api/task/v1/${taskId}`);
};
