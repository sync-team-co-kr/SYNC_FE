import { AxiosResByData } from '@customTypes/common';
import { RawProject } from '@customTypes/project';
import { userApiInstance } from '@libs/axios/axios';
import { CreateProjectRequestDto } from '@services/swagger/output/data-contracts';
import convertBase64ToFile from '@utils/file/convertBase64ToFile';
import getExtensionFromMimeType from '@utils/file/getExtensionFromMimeType';
import randomUuid from '@utils/file/getRandomUuid';
import { AxiosResponse } from 'axios';

interface GetMemberIds {
  userIds: number[];
  projectId: number;
}

interface IMember {
  userId: string;
  username: string;
  nickname: string;
  position: string;
}

/**
 * 프로젝트 목록을 가져오는 API
 * @param projectIds: number[];
 * @returns {
 *  projectId: number;
 *  title: string;
 *  subTitle: string;
 *  description: string;
 *  startDate: Date;
 *  endDate: Date;
 *  progress: number;
 *  thumbnail: string;
 *  thumbnailType: "N" | "E" | "C" | "I";
 *  members: {
 *    id: number;
 *    userId: string;
 *    username: string;
 *    nickname?: string;
 *    position?: string;
 *  }[];
 * }[]
 */

export const getProjects = async (projectIds: number[]) => {
  const joinedProjectIds = projectIds.join(',');

  const getProjectListResponse: AxiosResponse<AxiosResByData<RawProject[]>> =
    await userApiInstance.get(
      `node2/project/api/v1?projectIds=${joinedProjectIds}`,
    );

  console.log(getProjectListResponse);
  return getProjectListResponse.data.data;
};

/**
 * 프로젝트 목록을 가져오는 API
 * @param
 * @returns {
 *  projectIds: number[];
 * }
 */

export const getProjectIds = async (): Promise<number[]> => {
  const { loggedUserId } = window.localStorage;

  const getProjectIdsRes: AxiosResponse<
    AxiosResByData<any>,
    any
  > = await userApiInstance.get(`/project/api/v2?userId=${loggedUserId}`);

  const { projectIds } = getProjectIdsRes.data.data;
  return projectIds;
};

export const getTempProject = async (projectId: number) => {
  const getProjectResponse: AxiosResponse<AxiosResByData<RawProject[]>> =
    await userApiInstance.get(`node2/project/api/v1?projectIds=${projectId}`);

  const [project] = getProjectResponse.data.data;
  return project;
};

/**
 * 프로젝트 리스트의 id들만 가져오는 API
 */
export const getProjectIdList = async () => {
  const { loggedUserId } = window.localStorage;

  const getProjectIdsRes: AxiosResponse<
    AxiosResByData<{ projectIds: number[] }>,
    any
  > = await userApiInstance.get(`/project/api/v2?userId=${loggedUserId}`);

  const { projectIds } = getProjectIdsRes.data.data;
  return projectIds;
};

export const getProjectListWithMember = async () => {
  const loggedInUserId = localStorage.getItem('loggedUserId');

  // 로그인 중인 회원의 프로젝트 ID 목록 가져오기
  const getProjectIdsRes: AxiosResponse<
    AxiosResByData<{ projectIds: number[] }>,
    any
  > = await userApiInstance.get(`/project/api/v2?userId=${loggedInUserId}`);

  const projectsWithMemberIds = await Promise.all(
    getProjectIdsRes.data.data.projectIds.flatMap(async (projectId) => {
      // 프로젝트 목록 가져오기
      const getProjectResponse: AxiosResponse<AxiosResByData<RawProject[]>> =
        await userApiInstance.get('node2/project/api/v1', {
          params: {
            projectIds: projectId,
          },
        });

      // 각 프로젝트의 멤버 ID 목록 가져오기
      const getMemberIdsResponse: AxiosResponse<
        AxiosResByData<{ memberToUserId: GetMemberIds[] }>
      > = await userApiInstance.get('user/api/member/v2', {
        params: {
          projectIds: projectId,
        },
      });

      const [project] = getProjectResponse.data.data;
      const [memberIds] = getMemberIdsResponse.data.data.memberToUserId;

      const members = await Promise.all(
        memberIds.userIds.map(async (userId) => {
          // 멤버 ID를 통해 팀원들의 회원정보 가져오기
          const getUserResponse: AxiosResponse<AxiosResByData<IMember[]>> =
            await userApiInstance.get('/user/api/info/v2', {
              params: {
                userIds: userId,
              },
            });

          const [member] = getUserResponse.data.data.map((memberData) => ({
            ...memberData,
            id: userId,
          }));
          return member;
        }),
      );

      return { ...project, members };
    }),
  );

  return projectsWithMemberIds;
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

interface Temp {
  title: string;
  thumbnail?: string | Blob;
  thumbnailType?: 'N' | 'I' | 'C' | 'E';
  subTitle: string;
  description: string;
  startDate?: string;
  endDate: string;
  task?: {
    totalCount: number;
    completedCount: number;
  };
}

export const createProject = async (newProject: Temp) => {
  const formData = new FormData();

  if (newProject.thumbnail && newProject.thumbnailType === 'I') {
    const { thumbnail, ...newProjectWithCustomImage } = newProject;

    const projectWithCustomImageBlobType = new Blob(
      [JSON.stringify(newProjectWithCustomImage)],
      {
        type: 'application/json',
      },
    );

    formData.append('data', projectWithCustomImageBlobType);

    const imageFile = new File([newProject.thumbnail], 'test.img', {
      type: 'image/jpeg',
    });

    console.log(imageFile);

    formData.append('thumbnailImage', imageFile);
  } else {
    const project = new Blob([JSON.stringify(newProject)], {
      type: 'application/json',
    });

    formData.append('data', project);
  }

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

export const editProject = async (project: Omit<RawProject, 'members'>) => {
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
