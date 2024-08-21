import { requiredJwtTokeninstance } from '@libs/axios/axios';

export const getTask = async () => {
  const response = await requiredJwtTokeninstance.get(`user/api/task/v1`);

  return response.data;
};
