// import Add from '@assets/add.svg';
import { Button } from '@components/common/Button';
import TaskBoardList from '@components/project/Task/TaskBoardList';
import { useModal } from '@hooks';
import CreateProjectModal from '@pages/projects/ProjectBoards/CreateProjectModal/CreateProjectModal';
import styled from 'styled-components';

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

const ProjectWorkBoards = () => {
  // const [isOpen, openModal, modalRef, CreateProjectModalWrapper, closeModal] =
  //   useModal();

  const [openModal] = useModal();

  return (
    <Section>
      <Title>
        <h1 hidden>프로젝트 보드</h1>
      </Title>
      <ProjectBoardHeader>
        <Button
          size="medium"
          variant="fill"
          hasIcon={true}
          isDisabled={false}
          iconPosition="left"
          onClick={() => openModal(CreateProjectModal)}
          text="프로젝트 추가"
        />
        {/* <ProjectAddButton onClick={() => openModal(CreateProjectModal)}>
          <img src={Add} alt="프로젝트 추가" />
          <span>프로젝트 추가</span>
        </ProjectAddButton> */}
      </ProjectBoardHeader>
      <ProjectWorkList>
        <TaskBoardList />
      </ProjectWorkList>
    </Section>
  );
};

export default ProjectWorkBoards;
