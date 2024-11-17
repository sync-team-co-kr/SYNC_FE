import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const { searchQuery, updateSearchQuery, filteredProjects } = useDataHandler();

  const handleClickTabMenu = (path: string) => {
    setCurrentTabMenu(path);
    navigate(`/projects/${path}`);
  };

  return (
    <Container>
      <ProjectDropdown />
      <NavBar
        currentTabMenu={currentTabMenu}
        handleClickTabMenu={handleClickTabMenu}
      />
      <ProjectToolbar
        searchQuery={searchQuery}
        updateSearchQuery={updateSearchQuery}
      />
      <Outlet context={{ filteredProjects }} />
    </Container>
  );
};

export default Project;
