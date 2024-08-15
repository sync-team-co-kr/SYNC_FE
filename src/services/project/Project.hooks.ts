import { EditProjectParams } from '@customTypes/project';
import { CreateProjectRequestDto } from '@services/swagger/output/data-contracts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createProject,
  deleteProject,
  editProject,
  getProject,
  getProjectList,
} from './apis';

// projectList hooks
export const useGetProjectList = () => {
  const { data: projectListData } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjectList,
  });

  return { projectListData };
};

// project hooks
export const useGetProject = (projectId: number) => {
  const { data: projectData } = useQuery({
    queryKey: ['projects', projectId],
    queryFn: () => getProject(projectId),
  });

  return { projectData };
};

// create project hooks
export const useCreateProject = (newProject: CreateProjectRequestDto) => {
  const queryClient = useQueryClient();

  const createProjectMutation = useMutation({
    mutationFn: () => createProject(newProject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
  return { createProjectMutate: createProjectMutation.mutate };
};

// edit project hooks
export const useEditProject = (project: EditProjectParams) => {
  const queryClient = useQueryClient();

  const editProjectMutation = useMutation({
    mutationFn: () => editProject(project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  return { editProjectMutate: editProjectMutation.mutate };
};

// delete project hooks
export const useDeleteProject = (projectId: number) => {
  const queryClient = useQueryClient();

  const deleteProjectMutation = useMutation({
    mutationFn: () => deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  return { deleteProjectMutate: deleteProjectMutation.mutate };
};
