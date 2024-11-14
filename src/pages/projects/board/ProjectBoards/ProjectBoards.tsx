// import Add from '@assets/add.svg';
import { Button } from '@components/common/Button';
import { useModal } from '@hooks';
import { useGetProjects } from '@services/project/Project.hooks';

import CreateProjectModal from './CreateProjectModal/CreateProjectModal';
import ProjectBoardItem from './ProjectBoardItem/ProjectBoardItem';
import StyleProjectBoards from './ProjectBoards.style';

const ProjectBoards = () => {
  const [openModal] = useModal();
  const { projects } = useGetProjects();

  return (
    <StyleProjectBoards.Wrapper>
      <StyleProjectBoards.HiddenTitle>
        <h1 hidden>프로젝트 보드</h1>
      </StyleProjectBoards.HiddenTitle>
      <StyleProjectBoards.Header>
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
