import { useQuery } from '@tanstack/react-query';

import { getProjectMembers } from './apis';

export const useGetProjectMembers = (projectId: number) => {
  const { data: members } = useQuery({
    queryKey: ['projects', projectId],
    queryFn: () => getProjectMembers(projectId),
  });
  return { members };
};
