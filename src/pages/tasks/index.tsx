// import Add from '@assets/add.svg';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Button } from '@components/common/Button';
import { useModal } from '@hooks';
import CreateProjectModal from '@pages/projects/board/ProjectBoards/CreateProjectModal/CreateProjectModal';

import TaskBoardList from './Tasks.Board';
import { TaskBoardContainer, TaskBoardHeader } from './Tasks.style';

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
      <DndProvider backend={HTML5Backend}>
        <TaskBoardList />
      </DndProvider>
    </TaskBoardContainer>
  );
};

export default ProjectWorkBoards;
