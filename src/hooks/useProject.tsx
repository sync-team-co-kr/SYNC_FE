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

type useProjectType = (
  projectId: number,
) => [IProject | undefined, UseMutationResult<number, Error, number, unknown>];

const useProject: useProjectType = (projectId) => {
  const queryClient = useQueryClient();

  const getProject = async () => {
    const getProjectResponse: AxiosResponse<AxiosRes2<IProject[]>> =
      await requiredJwtTokeninstance.get(
        `http://129.213.161.199:31585/project/api/v1?projectIds=${projectId}`,
      );
    return getProjectResponse.data.value[0] || undefined;
  };

  const { data: project } = useQuery<IProject>({
    queryKey: ['project', projectId],
    queryFn: getProject,
  });

  const deleteProject = async (projectId: number) => {
    await requiredJwtTokeninstance.delete('/user/api/project', {
      data: {
        projectId,
      },
    });
    return projectId;
  };

  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
    },
  });

  return [project, deleteProjectMutation];
};

export default useProject;
