import { RawProject } from '@customTypes/project';
import { useToastActions } from '@libs/store/toast/toast';
import { getProjectMemberIds, getUser } from '@services/member/apis';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createProject,
  deleteProject,
  editProject,
  getProjectIdList,
  getProjectIds,
  getTempProject,
} from './apis';

export const useGetProjects = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const projectIds = await getProjectIds();

      const projectsWithMembers = await Promise.all(
        projectIds.flatMap(async (projectId) => {
          const project = await getTempProject(projectId);
          const [memberIds] = await getProjectMemberIds(projectId);

          const members = await Promise.all(
            memberIds.userIds.flatMap(async (userId) => {
              const userInfo = await getUser(userId);
              return { ...userInfo, id: userId };
            }),
          );

          return { ...project, members };
        }),
      );

      return projectsWithMembers;
    },
  });

  return { projects, isLoading };
};

export const useGetProject = (projectId: number) => {
  const { data: project, isLoading } = useQuery({
    queryKey: ['projects', projectId],
    queryFn: async () => {
      const getProjectData = await getTempProject(projectId);
      return getProjectData;
    },
    enabled: !!projectId,
  });
  return { project, isLoading };
};

export const useGetProjectIds = () => {
  const { data: projectIds } = useQuery({
    queryKey: ['projectIds'],
    queryFn: async () => {
      const projectIdList = await getProjectIdList();
      return projectIdList;
    },
  });

  return { projectIds };
};

// create project hooks
interface Temp {
  title: string;
  thumbnail: {
    type: 'N' | 'I' | 'C' | 'E';
    value?: string | Blob;
  };
  subTitle: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
}

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { setToastMessage } = useToastActions();

  const createProjectMutation = useMutation({
    mutationFn: (newProject: Temp) => {
      const newProjectPayload = {
        ...newProject,
        startDate: newProject.startDate?.toISOString(),
        endDate: newProject.endDate?.toISOString(),
        thumbnailType: newProject.thumbnail.type,
        thumbnail: newProject.thumbnail.value,
      };
      return createProject(newProjectPayload);
    },
    onSuccess: (data) => {
      // 프로젝트 생성 반환 값이 추가되면 서버 데이터를 이용해 캐시 작업 진행 예정
      setToastMessage(`${data.title} 프로젝트가 생성되었습니다.`, 'success');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
  return { createProjectMutate: createProjectMutation.mutate };
};

// edit project hooks
export const useEditProject = () => {
  const queryClient = useQueryClient();
  const { setToastMessage } = useToastActions();

  const editProjectMutation = useMutation({
    mutationFn: (project: Temp & { projectId: number }) => {
      const editProjectPayload = {
        ...project,
        startDate: project.startDate?.toISOString(),
        endDate: project.endDate?.toISOString(),
        thumbnailType: project.thumbnail.type,
        thumbnail: project.thumbnail.value,
      };
      return editProject(editProjectPayload);
    },
    onMutate: async (willUpdateProject) => {
      await queryClient.cancelQueries({
        queryKey: ['projects'],
      });

      const oldProjects = queryClient.getQueryData([
        'projects',
      ]) as RawProject[];

      queryClient.setQueryData(['projects'], () =>
        oldProjects.map((project) =>
          project.projectId === willUpdateProject.projectId
            ? { ...willUpdateProject, members: project.members }
            : { ...project },
        ),
      );
    },
    onSuccess: (data) => {
      setToastMessage(` ${data.title} 프로젝트를 수정했습니다.`, 'error');
    },
    onSettled: (editedProject) => {
      queryClient.invalidateQueries({
        queryKey: ['projects', editedProject?.projectId],
      });
    },
  });

  return { editProjectMutate: editProjectMutation.mutate };
};

// delete project hooks
export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const { setToastMessage } = useToastActions();

  const deleteProjectMutation = useMutation({
    mutationFn: (projectId: number) => deleteProject(projectId),
    onMutate: async (willDeleteProjectId) => {
      await queryClient.cancelQueries({
        queryKey: ['projects'],
      });

      const oldProjects = queryClient.getQueryData([
        'projects',
      ]) as RawProject[];

      queryClient.setQueryData(['projects'], () =>
        oldProjects.filter(
          (project) => project.projectId !== willDeleteProjectId,
        ),
      );
    },
    onSuccess: () => {
      setToastMessage('프로젝트가 삭제되었습니다.', 'success');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  return { deleteProjectMutate: deleteProjectMutation.mutate };
};
