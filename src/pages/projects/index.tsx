import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import NavBar from './NavBar';
import ProjectDropdown from './ProjectDropdown';

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
      <Outlet />
    </Container>
  );
};

export default Project;
