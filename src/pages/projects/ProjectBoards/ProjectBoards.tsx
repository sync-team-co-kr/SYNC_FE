// import Add from '@assets/add.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@components/common/Button';
import { useModal } from '@hooks';
import { useGetProjectList } from '@services/project/Project.hooks';
import { styled } from 'styled-components';
import { vars } from 'token';

import CreateProjectModal from './CreateProjectModal/CreateProjectModal';
import ProjectBoardItem from './ProjectBoardItem/ProjectBoardItem';
import StyleProjectBoards from './ProjectBoards.style';

const ProjectNavigator = styled.section`
  height: 48px;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  position: relative;
  h5 {
    color: ${vars.sementic.color.black};
    font-size: ${vars.sementic.typography['heading-4'].fontSize};
    font-weight: ${vars.sementic.typography['heading-4'].fontWeight};
    cursor: pointer;
  }
`;

const ProjectNavigatorDropdown = styled.ul<{ $isopen: boolean }>`
  width: 300px;
  padding: 12px 0;
  background-color: ${vars.sementic.color.white};
  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.05);

  display: ${(props) => (props.$isopen ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  position: absolute;
  bottom: -100px;
  z-index: 50;
  li {
    padding: 12px 8px;
    cursor: pointer;
    &:hover {
      background-color: ${vars.sementic.color.black20};
    }
  }
`;

const ProjectBoards = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [openModal] = useModal();
  const { projectListData } = useGetProjectList();

  return (
    <StyleProjectBoards.Wrapper>
      <StyleProjectBoards.HiddenTitle>
        <h1 hidden>프로젝트 보드</h1>
      </StyleProjectBoards.HiddenTitle>
      <StyleProjectBoards.Header>
        <ProjectNavigator>
          <h5 onClick={() => setIsOpen((prevState) => !prevState)}>전체보기</h5>
          <ProjectNavigatorDropdown $isopen={isOpen}>
            {projectListData?.map((project) => (
              <li
                key={project.projectId}
                onClick={() => navigate(`/projects/${project.projectId}`)}
              >
                {project.title}
              </li>
            ))}
          </ProjectNavigatorDropdown>
        </ProjectNavigator>

        <Button
          size="medium"
          variant="fill"
          $hasIcon={true}
          $isDisabled={false}
          $iconPosition="left"
          onClick={() => openModal(CreateProjectModal)}
          text="프로젝트 추가"
        />
      </StyleProjectBoards.Header>

      <StyleProjectBoards.BoardList>
        {projectListData?.map((project) => (
          <ProjectBoardItem key={project.projectId} project={project} />
        ))}
      </StyleProjectBoards.BoardList>
    </StyleProjectBoards.Wrapper>
  );
};

export default ProjectBoards;
