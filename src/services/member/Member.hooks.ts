import { useQuery } from '@tanstack/react-query';

import { getProjectMembers } from './apis';

export const useGetProjectMembers = (projectId: number) => {
  const { data: getMembersData } = useQuery({
    queryKey: ['projects', projectId],
    queryFn: () => getProjectMembers(projectId),
  });
  return { getMembersData };
};
