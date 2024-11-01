// import Add from '@assets/add.svg';
import { useParams } from 'react-router-dom';

import TaskBoardItem from '@components/Task/SpecificStatusTasks';
import { useGetTasks } from '@services/task';
import { vars } from 'token';

import { StyledTaskBoardList } from './Tasks.style';

export interface Project {
  projectId: number;
  title: string;
  subTitle: string;
  description: string;
  startDate: Date;
  endDate: Date;
  memberIds: number[];
}

const TaskBoardList = () => {
  // const [isOpen, openModal, modalRef, CreateProjectModalWrapper, closeModal] =
  //   useModal();

  const { id } = useParams();

  const { tasks } = useGetTasks(Number(id));

  return (
    <StyledTaskBoardList>
      <TaskBoardItem
        title="해야할 일"
        titleColor="negativeRed"
        borderColor={vars.sementic.color.black10}
        backgroundColor={vars.sementic.color.lightRed}
        projectId={Number(id)}
        tasks={tasks?.filter((task) => task.status === 2)}
      />
      <TaskBoardItem
        title="하는 중"
        titleColor="positiveBlue"
        borderColor={vars.sementic.color.black10}
        backgroundColor={vars.sementic.color.lightBlue}
        projectId={Number(id)}
        tasks={tasks?.filter((task) => task.status === 1)}
      />
      <TaskBoardItem
        title="완료"
        titleColor="black35"
        borderColor={vars.sementic.color.black10}
        projectId={Number(id)}
        tasks={tasks?.filter((task) => task.status === 0)}
        backgroundColor={vars.sementic.color.black10}
      />
    </StyledTaskBoardList>
  );
};

export default TaskBoardList;
