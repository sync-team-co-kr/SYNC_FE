// import Add from '@assets/add.svg';
import { Button } from '@components/common/Button';
import { useModal } from '@hooks';
import CreateProjectModal from '@pages/projects/ProjectBoards/CreateProjectModal/CreateProjectModal';

import TaskBoardList from './Tasks.Board';
import { Content, TaskBoardContainer, TaskBoardHeader } from './Tasks.style';

export interface Project {
  projectId: number;
  title: string;
  subTitle: string;
  description: string;
  startDate: Date;
  endDate: Date;
  memberIds: number[];
}

const ProjectWorkBoards = () => {
  const [openModal] = useModal();

  return (
    <TaskBoardContainer>
      <h1 hidden>프로젝트 보드</h1>
      <TaskBoardHeader>
        <Button
          size="medium"
          variant="fill"
          $hasIcon={true}
          $isDisabled={false}
          $iconPosition="left"
          onClick={() => openModal(CreateProjectModal)}
          text="프로젝트 추가"
        />
        {/* <ProjectAddButton onClick={() => openModal(CreateProjectModal)}>
          <img src={Add} alt="프로젝트 추가" />
          <span>프로젝트 추가</span>
        </ProjectAddButton> */}
      </TaskBoardHeader>
      <Content>
        <TaskBoardList />
      </Content>
    </TaskBoardContainer>
  );
};

export default ProjectWorkBoards;
