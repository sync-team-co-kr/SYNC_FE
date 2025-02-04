import { AxiosResByData } from '@customTypes/common';
import { IMember } from '@customTypes/member';
import { userApiInstance } from '@libs/axios/axios';
import { AxiosResponse } from 'axios';

interface GetMemberIds {
  userIds: number[];
  projectId: number;
}

interface GetMemberAuthorities {
  userId: number;
  projectId: number;
  isManager: number;
}

interface UpdateMemberRoleParams {
  userId: string;
  projectId: number;
  isManager: number;
}

/**
 * 단일 프로젝트 멤버 ID 목록 가져오기
 * @param projectId: number
 * @returns {
 *  memberToUserId: {
 *      userIds: number[];
 *      projectId: number;
 *  }[],
 * }
 */

export const getProjectMemberIds = async (projectId: number) => {
  const getMemberIdsResponse: AxiosResponse<
    AxiosResByData<{ memberToUserId: GetMemberIds[] }>
  > = await userApiInstance.get('user/api/member/v2', {
    params: {
      projectIds: projectId,
    },
  });

  return getMemberIdsResponse.data.data.memberToUserId;
};

/**
 * 멤버들의 권환 가져오기
 * @param memberIds: number[];
 * @returns {
 *  memberInfo: {
 *   userId: number;
 *   projectId: number;
 *   isManager: number;
 *  }[],
 * }
 */

export const getMemberAuthority = async (memberIds: number[]) => {
  const joinedMemberIdList = memberIds.join(',');

  // 단일 프로젝트의 멤버들의 권한 가져오기
  const getMemberAuthorityResponse: AxiosResponse<
    AxiosResByData<{ memberInfo: GetMemberAuthorities[] }>
  > = await userApiInstance.get('/user/api/member/v1', {
    params: {
      userIds: joinedMemberIdList,
    },
  });

  return getMemberAuthorityResponse;
};

/**
 * 회원의 정보 가져오기
 * @param userId: number
 * @returns {
 *   userId: string;
 *   username: string;
 *   nickname: string;
 *   position: string;
 * }
 */

export const getUser = async (userId: number) => {
  const getUserResponse: AxiosResponse<
    AxiosResByData<Omit<IMember, 'id' | 'isManager'>[]>
  > = await userApiInstance.get('/user/api/info/v2', {
    params: {
      userIds: userId,
    },
  });

  return getUserResponse.data.data[0];
};

export const getProjectMembers = async (projectId: number) => {
  // 단일 프로젝트 멤버 ID 목록 가져오기
  const getMemberIdsResponse: AxiosResponse<
    AxiosResByData<{ memberToUserId: GetMemberIds[] }>
  > = await userApiInstance.get('user/api/member/v2', {
    params: {
      projectIds: projectId,
    },
  });

  const [memberIdList] = getMemberIdsResponse.data.data.memberToUserId;

  const joinedMemberIdList = memberIdList.userIds.join(',');

  // 단일 프로젝트의 멤버들의 권한 가져오기
  const getMemberAuthorityResponse: AxiosResponse<
    AxiosResByData<{ memberInfo: GetMemberAuthorities[] }>
  > = await userApiInstance.get('/user/api/member/v1', {
    params: {
      userIds: joinedMemberIdList,
    },
  });

  const memberAuthorities =
    getMemberAuthorityResponse.data.data.memberInfo.filter(
      (memberAuthority) => memberAuthority.projectId === projectId,
    ); // {userId, projectId, isManaged}[]

  const memberListWithAuthority = await Promise.all(
    memberAuthorities.flatMap(async (member) => {
      // 멤버 ID를 통해 팀원들의 회원정보 가져오기
      const getUserResponse: AxiosResponse<AxiosResByData<IMember[]>> =
        await userApiInstance.get('/user/api/info/v2', {
          params: {
            userIds: member.userId,
          },
        });

      const [memberInfo] = getUserResponse.data.data;
      return { ...memberInfo, id: member.userId, isManager: member.isManager };
    }),
  );

  return memberListWithAuthority;
};

export const updateMemberRole = async ({
  userId,
  projectId,
  isManager,
}: UpdateMemberRoleParams) => {
  const response = await userApiInstance.put('/user/api/member', {
    userId,
    projectId,
    isManager,
  });

  console.log(response);

  return response;
};
