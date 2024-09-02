import { requiredJwtTokeninstance } from '@libs/axios/axios';
import { CreateTaskPayload } from '@services/swagger/output/data-contracts';

export const createTask = async ({ ...payload }: CreateTaskPayload) => {
  return requiredJwtTokeninstance.post('/user/api/task/v1', {
    data: payload,
    images: [],
  });
};

export const getTaskChildren = async (taskId: number) => {
  return requiredJwtTokeninstance.get(`/api/task/v1/${taskId}`);
};
