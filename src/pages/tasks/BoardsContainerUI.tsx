import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { RawProject } from '@customTypes/project';

import TaskBoardList from './Tasks.Board';
import { TaskBoardContainer, TaskBoardHeader } from './Tasks.style';

interface BoardsContainerUIProps {
  project?: RawProject;
}

const BoardsContainerUI = ({ project }: BoardsContainerUIProps) => {
  if (!project) return <>{/* 프로젝트 지정 안되어있을 때 */}</>;
  return (
    <TaskBoardContainer>
      <h1 hidden>프로젝트 보드</h1>
      <TaskBoardHeader></TaskBoardHeader>
      <DndProvider backend={HTML5Backend}>
        <TaskBoardList project={project} />
      </DndProvider>
    </TaskBoardContainer>
  );
};

export default BoardsContainerUI;
