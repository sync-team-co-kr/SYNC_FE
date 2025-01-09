import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { RawProject } from '@customTypes/project';
import { useBreadCrumbActions } from '@libs/store/breadcrumb/breadcrumb';
import { useGetProjects } from '@services/project/Project.hooks';
import styled from 'styled-components';

import NavBar from './NavBar';
import ProjectDropdown from './ProjectDropdown';
import ProjectToolbar from './ProjectToolbar';
import useDataHandler from './hook/useDataHandler';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Project = () => {
  const [currentTabMenu, setCurrentTabMenu] = useState('board');
  const { projects } = useGetProjects();
  const [projectData, setProjectData] = useState<RawProject[]>([]);
  const navigate = useNavigate();
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

  const handleClickTabMenu = (path: string) => {
    setCurrentTabMenu(path);
    navigate(`/projects/${path}`);
  };

  useEffect(() => {
    if (projects) {
      setProjectData(projects);
    }
  }, [projects]);

  return (
    <Container>
      <ProjectDropdown />
      <NavBar
        currentTabMenu={currentTabMenu}
        handleClickTabMenu={handleClickTabMenu}
      />
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
