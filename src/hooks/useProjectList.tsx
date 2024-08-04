import { requiredJwtTokeninstance } from '@libs/axios/axios';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface AxiosRes<ResponseType> {
  message: string;
  result: boolean;
  data: ResponseType;
}

interface AxiosRes2<ResponseType> {
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

type useProjectListType = () => IProject[] | undefined;

const useProjectList: useProjectListType = () => {
  const getAllProject = async () => {
    try {
      const getProjectIdsResponse: AxiosResponse<
        AxiosRes2<number[]>,
        any
      > = await requiredJwtTokeninstance.get(
        `/project/api/v2?userId=abc123@gmail.com`,
      );
      const getProjectListResponse: AxiosResponse<AxiosRes2<IProject[]>> =
        await requiredJwtTokeninstance.get(
          `http://129.213.161.199:31585/project/api/v1?projectIds=${getProjectIdsResponse.data.value.join(',')}`,
        );
      return getProjectListResponse.data.value || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const { data: projectList } = useQuery<IProject[]>({
    queryKey: ['project'],
    queryFn: getAllProject,
  });

  return projectList;
};

export default useProjectList;
