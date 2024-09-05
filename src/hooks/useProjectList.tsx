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
  data: ResponseType;
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
    const { userId } = window.localStorage;

    try {
      const getProjectIdsResponse: AxiosResponse<
        AxiosRes2<number[]>,
        any
      > = await requiredJwtTokeninstance.get(
        `/project/api/v2?userId=abc123@gmail.com`,
      );

      console.log(getProjectIdsResponse);

      const getProjectListResponse: AxiosResponse<AxiosRes2<IProject[]>> =
        await requiredJwtTokeninstance.get(
          `http://150.136.153.235:31585/project/api/v1?projectIds=${getProjectIdsResponse.data.data.join(',')}`,
        );

      return getProjectListResponse.data.data || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const { data: projectList } = useQuery<IProject[]>({
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

  return { projectList, createProjectMutation };
};

export default useProjectList;
