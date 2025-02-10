import { useMutation, useQuery } from '@tanstack/react-query';

import { getProjectMembers, updateMemberRole } from './apis';

interface UpdateMemberRoleParams {
  userId: string;
  projectId: number;
  isManager: number;
}

export const useGetProjectMembers = (projectId: number) => {
  const { data: getMembersData } = useQuery({
    queryKey: ['members', projectId],
    queryFn: () => getProjectMembers(projectId),
  });
  return { getMembersData };
};

export const useUpdateMemberRole = () => {
  const updateMemberRoleMutation = useMutation({
    mutationFn: ({ userId, projectId, isManager }: UpdateMemberRoleParams) =>
      updateMemberRole({ userId, projectId, isManager }),
  });

  return { updateMemberRoleMutate: updateMemberRoleMutation.mutate };
};
