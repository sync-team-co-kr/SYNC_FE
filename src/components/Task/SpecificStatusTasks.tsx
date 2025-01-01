import { useState } from 'react';
import { useDrop } from 'react-dnd';

import { ReactComponent as CreateIcon } from '@assets/projects/create.svg';
import { ReactComponent as WorkboxIcon } from '@assets/projects/workbox.svg';
import { Typography } from '@components/common/Typography';
import { ITask } from '@customTypes/task';
import { useDraggingTempTaskActions } from '@libs/store/task/draggingTempTask';
import { useUpdateTaskStatus } from '@services/task';
import styled from 'styled-components';
import { vars } from 'token';

import CreateTaskBoard from './CreateTaskBoard';
import TaskBoard from './TaskBoard';

// Props 타입 정의
interface TaskBoardContainerProps {
  $bordercolor?: string;
  $backgroundcolor?: string;
}

type TypographyColor =
  | 'negativeRed'
  | 'primaryLightOrange'
  | 'primaryOrange'
  | 'black'
  | 'black70'
  | 'black35'
  | 'black20'
  | 'black10'
  | 'white'
  | 'lightBlue'
  | 'positiveBlue'
  | 'lightRed'
  | 'alertLightOrange'
  | 'lightPurple'
  | 'purple';

const SpecificStatusTasksContainer = styled.li<TaskBoardContainerProps>`
  width: 414px;
  min-height: 100px;
  padding: 8px;
  border-radius: 12px;
  border: 1px solid
    ${(props) => props.$bordercolor || vars.sementic.color.black10};
  background: ${(props) =>
    props.$backgroundcolor || vars.sementic.color.lightRed};
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 8px;
`;

const StatusTitle = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
  gap: 8px;
`;

const TaskList = styled.ul`
  display: flex;
  justify-content: baseline;
  align-items: center;
  gap: 4px;
`;

const AddTaskButton = styled.button`
  display: flex;
  justify-content: baseline;
  align-items: center;
  height: 34px;
  color: var(--Black-White-Black-100, #202020);
  background-color: #ffffff;
  border-radius: 8px;
  border: none;
  margin: 0 8px 8px 8px;
  padding: 0;
  cursor: pointer;
`;

const Icon = styled.div`
  margin: 0 8px 0 8px;
`;

interface TaskBoardItemProps {
  title: '해야할 일' | '하는 중' | '완료';
  titleColor?: TypographyColor; // 타입을 제한된 색상으로 지정
  borderColor?: string;
  backgroundColor?: string;
  workBoardVisible?: boolean;
  projectId: number;
  tasks: ITask[];
}

const SpecificStatusTasks = ({
  title,
  titleColor = 'negativeRed',
  borderColor,
  backgroundColor,
  projectId,
  tasks,
  // workBoardVisible = true,
}: TaskBoardItemProps) => {
  const [isClicked, setIsClick] = useState(false);
  const [workBoards, setWorkBoards] = useState<any[]>([]); // 워크보드 상태

  const { updateTaskStatusMutate } = useUpdateTaskStatus();

  const { setDraggingTempTasks, resetDraggingTempTasks } =
    useDraggingTempTaskActions();

  const [, drop] = useDrop({
    accept: 'TaskBoard',
    drop(item: { id: number; status: number }, monitor) {
      if (!monitor.isOver()) return;
      console.log(title);
      let taskBoardStatus = 2;
      if (title === '하는 중') taskBoardStatus = 1;
      if (title === '완료') taskBoardStatus = 0;

      updateTaskStatusMutate({
        projectId,
        taskId: item.id,
        editedStatus: taskBoardStatus,
      });
    },
    hover(item: { id: number; status: number }, monitor) {
      if (!monitor.isOver()) {
        resetDraggingTempTasks();
      } else {
        let taskBoardStatus = 2;
        if (title === '하는 중') taskBoardStatus = 1;
        if (title === '완료') taskBoardStatus = 0;
        setDraggingTempTasks(item.status, taskBoardStatus, item.id);
      }
    },
  });

  const handleClick = (value: boolean | ((prevState: boolean) => boolean)) => {
    setIsClick(value);
  };

  const handleTaskCreated = (newTask: any) => {
    setWorkBoards([...workBoards, newTask]);
    setIsClick(false); // 작업 생성 후 창 닫기
  };

  return (
    <SpecificStatusTasksContainer
      ref={drop}
      $bordercolor={borderColor}
      $backgroundcolor={backgroundColor}
    >
      <Header>
        <StatusTitle>
          <Typography variant="heading-5" color={titleColor}>
            {title}
          </Typography>
          <TaskList>
            <WorkboxIcon stroke={vars.sementic.color[titleColor]} />
            <Typography variant="heading-4" color={titleColor}>
              {tasks?.length}
            </Typography>
          </TaskList>
        </StatusTitle>
      </Header>
      {tasks?.map((task) => (
        <div key={task.taskId}>
          <TaskBoard projectId={projectId} task={task} />
        </div>
      ))}
      {isClicked ? (
        <CreateTaskBoard
          statusTitle={title}
          onClose={() => handleClick(false)}
          onTaskCreated={handleTaskCreated}
        />
      ) : (
        <AddTaskButton onClick={() => handleClick(true)}>
          <Icon>
            <CreateIcon stroke={vars.sementic.color.black70} />
          </Icon>
          <Typography variant="heading-5" color="black70">
            업무 생성
          </Typography>
        </AddTaskButton>
      )}
    </SpecificStatusTasksContainer>
  );
};

export default SpecificStatusTasks;
