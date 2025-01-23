import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import TabMenu from '@components/TabMenu/TabMenu';
import { RawProject } from '@customTypes/project';
import { useBreadCrumbActions } from '@libs/store/breadcrumb/breadcrumb';
import { useGetProjects } from '@services/project/Project.hooks';
import styled from 'styled-components';

import ProjectDropdown from './ProjectDropdown';
import ProjectToolbar from './ProjectToolbar';
import { PROJECT_TAB_MENU_LIST } from './constants/projectTabMenuList';
import useDataHandler from './hook/useDataHandler';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Project = () => {
  const { projects } = useGetProjects();
  const [projectData, setProjectData] = useState<RawProject[]>([]);
  const {
    searchQuery,
    searchFilteredProjects,
    getUpcomingProjects,
    getMyProjects,
  } = useDataHandler({ setProjectData });
  const { setMainRoute } = useBreadCrumbActions();

  useEffect(() => {
    setMainRoute('프로젝트');
    return () => {
      setMainRoute('');
    };
  }, []);

  useEffect(() => {
    if (projects) {
      setProjectData(projects);
    }
  }, [projects]);

  return (
    <Container>
      <ProjectDropdown />
      <TabMenu tabMenuList={PROJECT_TAB_MENU_LIST} />
      <ProjectToolbar
        searchQuery={searchQuery}
        searchFilteredProjects={searchFilteredProjects}
        getUpcomingProjects={getUpcomingProjects}
        getMyProjects={getMyProjects}
      />
      <Outlet context={{ projectData }} />
    </Container>
  );
};

export default Project;
