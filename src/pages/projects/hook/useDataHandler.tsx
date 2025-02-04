import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { RawProject } from '@customTypes/project';
import { getLoggedUserAPI } from '@services/api';
import { useGetProjects } from '@services/project/Project.hooks';

type DataHandlerType = {
  setProjectData: Dispatch<SetStateAction<RawProject[]>>;
};
function useDataHandler({ setProjectData }: DataHandlerType) {
  const { projects } = useGetProjects();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response: { result: { userId: number } } =
          await getLoggedUserAPI();
        setUserId(response.result.userId);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserId();
  }, []);

  // 프로젝트 검색
  const searchFilteredProjects = (query: string) => {
    if (!projects || projects.length === 0) return [];

    setSearchQuery(query);
    const filteredProjects = projects?.filter(
      (project) =>
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.subTitle.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase()),
    );

    if (!filteredProjects || filteredProjects.length === 0)
      return setProjectData([]);
    setProjectData(filteredProjects);
    return filteredProjects;
  };

  // 마감일에 임박한 프로젝트
  const getUpcomingProjects = () => {
    if (!projects || projects.length === 0) return [];

    setSearchQuery('');

    const upcomingProjects = projects.sort((a, b) => {
      const dateA = new Date(a.endDate).getTime();
      const dateB = new Date(b.endDate).getTime();
      return dateA - dateB; // 오름차순 정렬
    });

    setProjectData(upcomingProjects);
    return upcomingProjects;
  };

  // 내가 속한 프로젝트
  const getMyProjects = () => {
    if (!projects || projects.length === 0) return [];

    const myProjects = projects?.filter((project) =>
      project.members.some((member) => member.id === userId),
    );

    setProjectData(myProjects);
    return myProjects;
  };

  return {
    searchQuery,
    searchFilteredProjects,
    getUpcomingProjects,
    getMyProjects,
  };
}

export default useDataHandler;
