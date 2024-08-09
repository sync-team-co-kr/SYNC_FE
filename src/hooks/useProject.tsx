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

interface editProjectParams {
  title: string;
  subTitle: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
}

interface useProjectResponse {
  project: IProject | undefined;
  isLoading: boolean;
  editProjectMutation: UseMutationResult<
    void,
    Error,
    editProjectParams,
    unknown
  >;
  deleteProjectMutation: UseMutationResult<number, Error, void, unknown>;
}

type useProjectType = (projectId: number) => useProjectResponse;

const useProject: useProjectType = (projectId) => {
  const queryClient = useQueryClient();

  const getProject = async () => {
    const getProjectResponse: AxiosResponse<AxiosRes2<IProject[]>> =
      await requiredJwtTokeninstance.get(
        `http://129.213.161.199:31585/project/api/v1?projectIds=${projectId}`,
      );
    return getProjectResponse.data.value[0] || undefined;
  };

  const { data: project, isLoading } = useQuery<IProject>({
    queryKey: ['project', projectId],
    queryFn: getProject,
  });

  const editProject = async (newProject: editProjectParams) => {
    try {
      await requiredJwtTokeninstance.put('/user/api/project', {
        projectId,
        ...newProject,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const editProjectMutation = useMutation({
    mutationFn: editProject,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['project', projectId] }),
  });

  const deleteProject = async () => {
    await requiredJwtTokeninstance.delete('/user/api/project', {
      data: {
        projectId,
      },
    });
    return projectId;
  };

  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['project', projectId] }),
  });

  return { project, isLoading, editProjectMutation, deleteProjectMutation };
};

export default useProject;
