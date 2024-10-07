import { useEffect, useState } from 'react';

import { userApiInstance } from '@libs/axios/axios';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface AxiosRes<ResponseType> {
  message: string;
  result: boolean;
  value: ResponseType;
}

export interface IProject {
  projectId: number;
  title: string;
  subTitle: string;
  description: string;
  startDate: Date;
  endDate: Date;
  memberIds: number[];
}

interface getProjectMembersResponse {
  projectId: number;
  userIds: number[];
}

interface getMemberRoleResponse {
  userId: number;
  projectId: number;
  isManager: number;
}

interface IUser {
  username: string;
  nickname?: string;
  position?: string;
  isManager: number;
}

interface IMember extends IUser {
  userId: number;
  username: string;
  nickname?: string;
  position?: string;
  isManager: number;
  projectId: number;
}

interface useMemberListResponse {
  memberList?: IMember[];
  isLoading: boolean;
}

type useMemberListType = (
  selectedProject: IProject | null,
) => useMemberListResponse;

const useMemberList: useMemberListType = (selectedProject) => {
  const [memberList, setMemberList] = useState<IMember[] | undefined>(
    undefined,
  );

  const getAllMember = async () => {
    if (selectedProject) {
      try {
        // 프로젝트에 속한 멤버의 아이디 불러오기
        const response: AxiosResponse<AxiosRes<getProjectMembersResponse[]>> =
          await userApiInstance.get(`/user/api/member/v2`, {
            params: {
              projectIds: [selectedProject.projectId].toString(),
            },
          });

        // 멤버의 권한 불러오기
        const { userIds } = response.data.value[0];
        const getMemberRoleRes: AxiosResponse<
          AxiosRes<getMemberRoleResponse[]>
        > = await userApiInstance.get('/user/api/member/v1', {
          params: {
            userIds: userIds.join(','),
          },
        });

        // 멤버의 회원 정보 불러오기
        const primaryKeyMemberList = getMemberRoleRes.data.value.filter(
          (value) => {
            const isEqualCurrentProject =
              selectedProject.projectId === value.projectId ? 'yes' : 'no';
            if (isEqualCurrentProject === 'yes') return true;
            return false;
          },
        );
        const getMembersData: IMember[] = await Promise.all(
          primaryKeyMemberList.map(async (value) => {
            const getMembersRes: AxiosResponse<AxiosRes<IUser[]>> =
              await userApiInstance.get('/user/api/info/v2', {
                params: {
                  userIds: value.userId.toString(),
                },
              });

            /* eslint-disable @typescript-eslint/no-unused-vars */
            const { isManager, ...memberInfo } = getMembersRes.data.value[0];
            return { ...value, ...memberInfo };
          }),
        );
        return getMembersData;
      } catch (error) {
        console.log(error);
      }
    }
    return [];
  };

  const { data, isLoading } = useQuery<IMember[]>({
    queryKey: ['member'],
    queryFn: getAllMember,
    enabled: selectedProject !== null,
  });

  useEffect(() => {
    setMemberList(data);
  }, [isLoading, selectedProject]);

  return { memberList, isLoading };
};

export default useMemberList;
