import { AxiosRes } from '@customTypes/common';
import { Project } from '@customTypes/project';
import { requiredJwtTokeninstance } from '@libs/axios/axios';
import { AxiosResponse } from 'axios';

/**
 * 프로젝트 리스트를 가져오는 API
 */

export const getProjectList = async () => {
  const response: AxiosResponse<
    AxiosRes<Project[]>,
    any
  > = await requiredJwtTokeninstance.get('/api/user/project/get');

  return response.data.value;
};

export default getProjectList;
