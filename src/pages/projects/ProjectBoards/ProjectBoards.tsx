// import Add from '@assets/add.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as ArrowBottom } from '@assets/common/arrow/arrow-bottom.svg';
import { Button } from '@components/common/Button';
import ProjectNavigation from '@components/dropdown/ProjectNavigationDropdown';
import { RawProject } from '@customTypes/project';
import { useModal } from '@hooks';
import CreateProjectModal from '@pages/projects/board/ProjectBoards/CreateProjectModal/CreateProjectModal';
import ProjectBoardItem from '@pages/projects/board/ProjectBoards/ProjectBoardItem/ProjectBoardItem';
import StyleProjectBoards from '@pages/projects/board/ProjectBoards/ProjectBoards.style';
import { useGetProjects } from '@services/project/Project.hooks';
import { styled } from 'styled-components';
import { vars } from 'token';

const ProjectNavigator = styled.section`
  width: 160px;
  height: 48px;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  position: relative;
  & > div {
    padding: 8px 12px;
    display: flex;
    align-items: center;
    gap: 12px;
    h5 {
      color: ${vars.sementic.color.black};
      font-size: ${vars.sementic.typography['heading-4'].fontSize};
      font-weight: ${vars.sementic.typography['heading-4'].fontWeight};
      cursor: pointer;
    }
  }
`;

const ProjectBoards = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openModal] = useModal();
  const navigate = useNavigate();
  const { projects } = useGetProjects();

  const handleSelectProjectNavigationItem = (project: RawProject) => {
    navigate(`/projects/${project.projectId}`);
  };

  console.log(projects);

  return (
    <StyleProjectBoards.Wrapper>
      <StyleProjectBoards.HiddenTitle>
        <h1 hidden>프로젝트 보드</h1>
      </StyleProjectBoards.HiddenTitle>
      <StyleProjectBoards.Header>
        <ProjectNavigator>
          <div onClick={() => setIsOpen((prevState) => !prevState)}>
            <h5>전체보기</h5>
            <ArrowBottom />
          </div>
          <ProjectNavigation
            isOpen={isOpen}
            projects={projects}
            handleSelectNavigationItem={handleSelectProjectNavigationItem}
          />
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
