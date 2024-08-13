import { requiredJwtTokeninstance } from '@libs/axios/axios';
import {
  UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

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

interface CreateProjectParams {
  title: string;
  subTitle: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
}

interface useProjectListResponse {
  projectList: IProject[] | undefined;
  isLoading: boolean;
  createProjectMutation: UseMutationResult<
    CreateProjectParams,
    Error,
    CreateProjectParams,
    unknown
  >;
}

type useProjectListType = () => useProjectListResponse;

const useProjectList: useProjectListType = () => {
  const queryClient = useQueryClient();

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

  const { data: projectList, isLoading } = useQuery<IProject[]>({
    queryKey: ['project'],
    queryFn: getAllProject,
  });

  const createProject = async (newProject: CreateProjectParams) => {
    await requiredJwtTokeninstance.post('/user/api/project', {
      ...newProject,
    });
    return newProject;
  };

  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  return { projectList, isLoading, createProjectMutation };
};

export default useProjectList;
