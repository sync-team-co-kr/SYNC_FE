import React from 'react';

import fakeAvatar from '@assets/rectangle-50.png';
import IProject from '@customTypes/project/Project';
import { styled } from 'styled-components';

const Wrapper = styled.section<{ $isopen: boolean }>`
  width: 300px;
  height: 500px;
  padding: 8px 12px;

  background: var(--Black-White-White, #fff);
  border-radius: 12px;
  border: 1px solid var(--Black-White-Black-10, #f4f4f4);
  /* Drop Shadow */
  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.05);
  display: ${(props) => (props.$isopen ? 'flex' : 'none')};
  z-index: 50;
`;

const SProjectList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  align-self: stretch;
`;

const SProjectItem = styled.li`
  height: 44px;
  padding: 6px 0;
  display: flex;
  align-items: center;
  gap: 6px;
`;

interface RouteProjectDropdownProps {
  isOpen: boolean;
  toggleModal: () => void;
  projectList?: IProject[];
  setSelectedProject: React.Dispatch<React.SetStateAction<IProject | null>>;
}

const RouteProjectDropdown = ({
  isOpen,
  toggleModal,
  projectList,
  setSelectedProject,
}: RouteProjectDropdownProps) => {
  const handleClickProjectItem = (project: IProject) => {
    setSelectedProject(project);
    toggleModal();
  };

  return (
    <Wrapper $isopen={isOpen}>
      <SProjectList>
        {projectList?.map((project) => (
          <SProjectItem
            key={project.projectId}
            onClick={() => handleClickProjectItem(project)}
          >
            <img src={fakeAvatar} alt="프로젝트 이미지" />
            <span>{project.title}</span>
          </SProjectItem>
        ))}
      </SProjectList>
    </Wrapper>
  );
};

export default RouteProjectDropdown;
