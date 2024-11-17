import { useState } from 'react';

import { useGetProjectList } from '@services/project/Project.hooks';

function useDataHandler() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { projectListData } = useGetProjectList();

  const updateSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  const filteredProjects = (projectListData ?? []).filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.subTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return { searchQuery, updateSearchQuery, filteredProjects };
}

export default useDataHandler;
