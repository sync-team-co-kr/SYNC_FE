import { AxiosResByData } from '@customTypes/common';
import { EditProjectParams } from '@customTypes/project';
import IProject from '@customTypes/project/Project';
import { userApiInstance } from '@libs/axios/axios';
import { CreateProjectRequestDto } from '@services/swagger/output/data-contracts';
import { AxiosResponse } from 'axios';

/**
 * 프로젝트 리스트의 id들만 가져오는 API
 */
export const getProjectIdList = async () => {
  const { loggedUserId } = window.localStorage;

  const getProjectIdsRes: AxiosResponse<
    AxiosResByData<any>,
    any
  > = await userApiInstance.get(`/project/api/v2?userId=${loggedUserId}`);

  const { userId } = getProjectIdsRes.data.data;

  return userId;
};

/**
 * 프로젝트 리스트를 가져오는 API
 */

export const getProjectList = async () => {
  /**
   *  /api/user/info/v1 반환값으로 userId가 추가될 때
   * /project/api/v2 userId의 params 값으로 사용
   */

  const loggedInUserId = localStorage.getItem('loggedUserId');

  const getProjectIdsRes: AxiosResponse<
    AxiosResByData<{ projectIds: number[] }>,
    any
  > = await userApiInstance.get(`/project/api/v2?userId=${loggedInUserId}`);

  const joinedProjectIds = getProjectIdsRes.data.data.projectIds.join(',');

  const getProjectListResponse: AxiosResponse<AxiosResByData<IProject[]>> =
    await userApiInstance.get(
      `node2/project/api/v1?projectIds=${joinedProjectIds}`,
    );

  return getProjectListResponse.data.data;
};

export const getProjectListWithMember = async () => {
  const loggedInUserId = localStorage.getItem('loggedUserId');

  const getProjectIdsRes: AxiosResponse<
    AxiosResByData<{ projectIds: number[] }>,
    any
  > = await userApiInstance.get(`/project/api/v2?userId=${loggedInUserId}`);

  const projectList: IProject[] = await Promise.all(
    getProjectIdsRes.data.data.projectIds.map(async (projectId) => {
      // 프로젝트 가져오기
      const getProjectResponse: AxiosResponse<AxiosResByData<IProject>> =
        await userApiInstance.get('node2/project/api/v1', {
          params: {
            projectIds: projectId,
          },
        });

      return getProjectResponse.data.data;
    }),
  );
  return projectList;
};

/**
 * 프로젝트를 가져오는 API
 * @param projectId: number
 * @returns {
 *  result: boolean;
 *  message: string;
 *  value: {
 *  projectId: number;
 *  title: string;
 *  description: string;
 *  startDate: Date;
 *  endDate: Date;
 *  progress: number;
 *  }
 * }
 */

export const getProject = async (projectId: number) => {
  const getProjectResponse: AxiosResponse<
    AxiosResByData<{ projectInfos: IProject[] }>
  > = await userApiInstance.get(`node2/project/api/v1?projectIds=${projectId}`);

  return getProjectResponse.data.data.projectInfos[0];
};

/**
 * 프로젝트를 생성하는 API
 * @param newProject: {
 *  title: string;
 *  subTitle?: stirng;
 *  description?: string;
 *  startDate?: string;
 *  endDate?: string;
 * }
 * @returns {
 *  result: boolean;
 *  message: string;
 * }
 */

export const createProject = async (newProject: CreateProjectRequestDto) => {
  const formData = new FormData();
  const project = new Blob([JSON.stringify(newProject)], {
    type: 'application/json',
  });
  formData.append('data', project);
  await userApiInstance.post('/user/api/project', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return newProject;
};

/**
 * 프로젝트를 수정하는 API
 * @param project: {
 *  projectId: number;
 *  title: string;
 *  subTitle?: stirng;
 *  description?: string;
 *  startDate?: string;
 *  endDate?: string;
 * }
 * @returns {
 *  result: boolean;
 *  message: string;
 * }
 */

export const editProject = async (project: EditProjectParams) => {
  console.log(project);
  const formData = new FormData();
  const blobTypeProject = new Blob([JSON.stringify(project)], {
    type: 'application/json',
  });
  formData.append('data', blobTypeProject);
  await userApiInstance.put('/user/api/project', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return project;
};

/**
 * 프로젝트를 삭제하는 API
 * @param projectId: number;
 * @returns {
 *  result: boolean;
 *  message: string;
 * }
 */

export const deleteProject = async (projectId: number) => {
  await userApiInstance.delete('/user/api/project', {
    data: {
      projectId,
    },
  });

  return projectId;
};
