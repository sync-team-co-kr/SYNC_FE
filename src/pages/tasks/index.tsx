// import Add from '@assets/add.svg';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
  return (
    <TaskBoardContainer>
      <h1 hidden>프로젝트 보드</h1>
      <TaskBoardHeader>
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
