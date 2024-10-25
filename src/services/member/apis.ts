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

  const [memberInfoList] = memberListWithAuthority;

  return memberInfoList;
};
