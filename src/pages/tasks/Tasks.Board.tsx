import TaskBoardItem from '@components/Task/SpecificStatusTasks';
import { RawProject } from '@customTypes/project';
import { useDraggingTempTaskState } from '@libs/store/task/draggingTempTask';
import { vars } from 'token';

import { StyledTaskBoardList } from './Tasks.style';

interface BoardsContainerUIProps {
  project: RawProject;
}

const TaskBoardList = ({ project }: BoardsContainerUIProps) => {
  const { originalTasks, draggingTempTasks } = useDraggingTempTaskState();

  if (!originalTasks) return <div>Task가 없을 때의 페이지</div>;
  if (draggingTempTasks)
    return (
      <StyledTaskBoardList>
        <TaskBoardItem
          title="해야할 일"
          titleColor="negativeRed"
          borderColor={vars.sementic.color.black10}
          backgroundColor={vars.sementic.color.lightRed}
          projectId={project.projectId}
          tasks={draggingTempTasks.filter((task) => task.status === 0)}
        />
        <TaskBoardItem
          title="하는 중"
          titleColor="positiveBlue"
          borderColor={vars.sementic.color.black10}
          backgroundColor={vars.sementic.color.lightBlue}
          projectId={project.projectId}
          tasks={draggingTempTasks.filter((task) => task.status === 1)}
        />
        <TaskBoardItem
          title="완료"
          titleColor="black35"
          borderColor={vars.sementic.color.black10}
          projectId={project.projectId}
          tasks={draggingTempTasks.filter((task) => task.status === 2)}
          backgroundColor={vars.sementic.color.black10}
        />
      </StyledTaskBoardList>
    );
  return (
    <StyledTaskBoardList>
      <TaskBoardItem
        title="해야할 일"
        titleColor="negativeRed"
        borderColor={vars.sementic.color.black10}
        backgroundColor={vars.sementic.color.lightRed}
        projectId={project.projectId}
        tasks={originalTasks.filter((task) => task.status === 0)}
      />
      <TaskBoardItem
        title="하는 중"
        titleColor="positiveBlue"
        borderColor={vars.sementic.color.black10}
        backgroundColor={vars.sementic.color.lightBlue}
        projectId={project.projectId}
        tasks={originalTasks.filter((task) => task.status === 1)}
      />
      <TaskBoardItem
        title="완료"
        titleColor="black35"
        borderColor={vars.sementic.color.black10}
        projectId={project.projectId}
        tasks={originalTasks.filter((task) => task.status === 2)}
        backgroundColor={vars.sementic.color.black10}
      />
    </StyledTaskBoardList>
  );
};

export default TaskBoardList;
