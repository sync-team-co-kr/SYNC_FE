// import Add from '@assets/add.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import defaultProjectImg from '@assets/project-icon.png';
import { Button } from '@components/common/Button';
import { useModal } from '@hooks';
import { useGetProjects } from '@services/project/Project.hooks';
import { styled } from 'styled-components';
import { vars } from 'token';

import CreateProjectModal from './CreateProjectModal/CreateProjectModal';
import ProjectBoardItem from './ProjectBoardItem/ProjectBoardItem';
import StyleProjectBoards from './ProjectBoards.style';

const ProjectNavigator = styled.section`
  width: 100px;
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
  border: 1px solid ${vars.sementic.color.black10};
  border-radius: 12px;
  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.05);

  display: ${(props) => (props.$isopen ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  position: absolute;
  top: 100%;
  z-index: 50;
`;

const NavigationItem = styled.li`
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  & div:first-child {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: ${vars.sementic.typography['heading-3']};
    }
  }
  & div:last-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
    & span:first-child {
      font-size: ${vars.sementic.typography['heading-4']};
      font-weight: 700;
    }
    & span:last-child {
      color: ${vars.sementic.color.black35};
      font-size: ${vars.sementic.typography['small-text-b']};
      font-weight: 700;
    }
  }
  &:hover {
    background-color: ${vars.sementic.color.black20};
  }
`;

const ProjectBoards = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [openModal] = useModal();
  const { projects } = useGetProjects();

  return (
    <StyleProjectBoards.Wrapper>
      <StyleProjectBoards.HiddenTitle>
        <h1 hidden>프로젝트 보드</h1>
      </StyleProjectBoards.HiddenTitle>
      <StyleProjectBoards.Header>
        <ProjectNavigator>
          <h5 onClick={() => setIsOpen((prevState) => !prevState)}>전체보기</h5>
          <ProjectNavigatorDropdown $isopen={isOpen}>
            {projects?.map((project) => (
              <NavigationItem
                key={project.projectId}
                onClick={() => navigate(`/projects/${project.projectId}`)}
              >
                <div>
                  {project.thumbnail ? (
                    <span>{project.thumbnail}</span>
                  ) : (
                    <img src={defaultProjectImg} alt="프로젝트 기본 이미지" />
                  )}
                </div>
                <div>
                  <span>{project.title}</span>
                  <span>{project.subTitle}</span>
                </div>
              </NavigationItem>
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
        {projects?.map((project) => (
          <ProjectBoardItem key={project.projectId} project={project} />
        ))}
      </StyleProjectBoards.BoardList>
    </StyleProjectBoards.Wrapper>
  );
};

export default ProjectBoards;
