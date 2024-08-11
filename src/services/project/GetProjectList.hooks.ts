import { useQuery } from '@tanstack/react-query';

import getProjectList from './getProjectList';

// projectList hooks
export const useGetProjectList = () => {
  const { data: projectListData } = useQuery({
    queryKey: ['projectList'],
    queryFn: getProjectList,
  });

  return { projectListData };
};
