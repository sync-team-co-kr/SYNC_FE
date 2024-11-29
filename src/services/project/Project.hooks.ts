import { RawProject } from '@customTypes/project';
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
    queryKey: ['projects'],
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
    onSuccess: () => {
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
    onSuccess: (editedProject) => {
      queryClient.invalidateQueries({
        queryKey: ['projects', editedProject.projectId],
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  return { deleteProjectMutate: deleteProjectMutation.mutate };
};
