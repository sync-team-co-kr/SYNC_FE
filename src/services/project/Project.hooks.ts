import { RawProject } from '@customTypes/project';
import { getLoggedUserAPI } from '@services/api';
import { getProjectMemberIds, getUser } from '@services/member/apis';
import { CreateProjectRequestDto } from '@services/swagger/output/data-contracts';
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
export const useCreateProject = () => {
  const queryClient = useQueryClient();

  const createProjectMutation = useMutation({
    mutationFn: (newProject: CreateProjectRequestDto) =>
      createProject(newProject),
    onMutate: async (newProject) => {
      //
      await queryClient.cancelQueries({
        queryKey: ['projects'],
      });

      const oldProjects = queryClient.getQueryData(['projects']) as
        | RawProject[]
        | undefined;

      const {
        result: { userId },
      } = await getLoggedUserAPI();
      const userInfo = await getUser(userId);

      console.log([
        ...(oldProjects || []),
        {
          ...newProject,
          projectId: Date.now(),
          process: 0,
          members: [{ ...userInfo, id: userId }],
        },
      ]);

      queryClient.setQueryData(['projects'], () => [
        ...(oldProjects || []),
        {
          ...newProject,
          projectId: Date.now(),
          process: 0,
          members: [{ ...userInfo, id: userId }],
        },
      ]);

      return oldProjects;
    },
    onSuccess: () => {
      // 프로젝트 생성 반환 값이 추가되면 서버 데이터를 이용해 캐시 작업 진행 예정
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

  const editProjectMutation = useMutation({
    mutationFn: (project: Omit<RawProject, 'members'>) => editProject(project),
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
    onSuccess: (data) => {
      console.log(data);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  return { deleteProjectMutate: deleteProjectMutation.mutate };
};
