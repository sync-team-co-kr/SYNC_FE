import { Dispatch, SetStateAction, useState } from 'react';

import { RawProject } from '@customTypes/project';
import { useGetProjects } from '@services/project/Project.hooks';

type DataHandlerType = {
  setProjectData: Dispatch<SetStateAction<RawProject[]>>;
};
function useDataHandler({ setProjectData }: DataHandlerType) {
  const { projects } = useGetProjects();
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 프로젝트 검색
  const searchFilteredProjects = (query: string) => {
    setSearchQuery(query);
    const filteredProjects = projects?.filter(
      (project) =>
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.subTitle.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase()),
    );

    if (!filteredProjects || filteredProjects.length === 0) return [];
    setProjectData(filteredProjects || []);
    return filteredProjects;
  };

  // 마감일에 임박한 프로젝트
  const getUpcomingProjects = () => {
    if (!projects || projects.length === 0) return [];

    const upcomingProjects = projects.sort((a, b) => {
      const dateA = new Date(a.endDate).getTime();
      const dateB = new Date(b.endDate).getTime();
      return dateA - dateB; // 오름차순 정렬
    });

    setProjectData(upcomingProjects);
    return upcomingProjects;
  };

  return {
    searchQuery,
    searchFilteredProjects,
    getUpcomingProjects,
  };
}

export default useDataHandler;
