// import Add from '@assets/add.svg';
import { useParams } from 'react-router-dom';

import { useGetTasks } from '@services/task';
import styled from 'styled-components';
import { vars } from 'token';

import TaskBoardItem from './TaskBoardItem';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 0 0 40px;
`;

const Title = styled.article`
  margin-bottom: 20px;
`;

const ProjectBoardHeader = styled.section`
  margin-bottom: 20px;
`;

const ProjectWorkList = styled.ul`
  display: flex;
  gap: 20px;
  align-items: flex-start;
`;

// const ProjectAddButton = styled.button`
//   height: 36px;
//   padding: 8px 24px;
//   background-color: var(--Primary-Orange-Yellow-Orange, #ffd880);
//   border: none;
//   border-radius: 8px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 12px;
//   cursor: pointer;
//   span {
//     color: var(--Black-White-Black-100, #202020);
//     /* Heading 5 */
//     font-family: Pretendard;
//     font-size: 14px;
//     font-style: normal;
//     font-weight: 700;
//     line-height: 17px;
//   }
// `;

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
    <Section>
      <Title>
        <h1 hidden>프로젝트 보드</h1>
      </Title>
      <ProjectBoardHeader>
        {/* <ProjectAddButton onClick={() => openModal(CreateProjectModal)}>
          <img src={Add} alt="프로젝트 추가" />
          <span>프로젝트 추가</span>
        </ProjectAddButton> */}
      </ProjectBoardHeader>
      <ProjectWorkList>
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
      </ProjectWorkList>
    </Section>
  );
};

export default TaskBoardList;
