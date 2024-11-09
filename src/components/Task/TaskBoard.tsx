import { useDrag } from 'react-dnd';

import meatballs from '@assets/meatballs.svg';
import Dday from '@assets/projects/d-day-img.png';
import workboardimg from '@assets/projects/workboard-image.png';
import { ReactComponent as WorkboxIcon } from '@assets/projects/workbox.svg';
import { Typography } from '@components/common/Typography';
import WorkBoardDropdownMenu from '@components/dropdown/WorkBoardDropdownMenu';
import { useModal } from '@hooks';
import useDropdown from '@hooks/useDropdown';
import styled from 'styled-components';
import { vars } from 'token';

import { UpdateTaskModal } from './UpdateTaskModal';

const StyledTaskBoard = styled.section`
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--Black-White-Black-10, #f4f4f4);
  background: var(--Black-White-White, #fff);
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer; // 클릭 시 커서 변경
`;

const MeatBalls = styled.div`
  cursor: pointer;
  position: relative;
  display: none;
`;

const TaskBoardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover ${MeatBalls} {
    display: block;
  }
`;

const Header = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  img {
    width: 24px;
    height: 24px;
  }
`;

const TaskBoardContent = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Description = styled.div`
  height: auto;
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const BarGraph = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  & span:first-child {
    font-size: ${vars.sementic.typography['small-text-b']};
    font-weight: 700;
    color: ${vars.sementic.color.black20};
  }
  & span:last-child {
    font-size: ${vars.sementic.typography['small-text-b']};
    font-weight: 700;
    color: ${vars.sementic.color.black};
  }
`;

const TaskBoardFooter = styled.section`
  padding: 0 1px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskBoardMemberList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: -2px;
  li {
    width: 36px;
    height: 36px;
    padding: 5px 1px;
    background: var(--Alert-Color-Light-Blue, #e7f1ff);
    border: 2px solid var(--Black-White-White, #fff);
    border-radius: 999px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const TaskBoardPeriod = styled.div`
  background-color: ${vars.sementic.color.black10};
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const SubTask = styled.button`
  display: flex;
  align-items: center;
  height: 36px;
  border-radius: 8px;
  border: none;
  color: ${vars.sementic.color.black70};
  background: ${vars.sementic.color.black10};
`;

const Icon = styled.div`
  margin: 0 8px 0 8px;
`;

interface TempTask {
  taskId: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  depth: number;
  progress: number;
  status: number;
}

const TaskBoard = ({
  projectId,
  task,
}: {
  projectId: number;
  task: TempTask;
}) => {
  const [
    isOpenProjectDropdownMenu,
    toggleProjectDropdownMenu,
    projectDropdownMenuRef,
  ] = useDropdown();

  const [openModal] = useModal();

  const [, drag] = useDrag(() => ({
    type: 'TaskBoard',
    item: { id: task.taskId, status: task.status },
  }));

  return (
    <>
      <StyledTaskBoard ref={drag}>
        <TaskBoardHeader>
          <Header>
            <img src={workboardimg} alt="작업 보드" />
            <Typography variant="heading-4" color="black">
              {task.title}
            </Typography>
          </Header>
          <MeatBalls ref={projectDropdownMenuRef}>
            <img
              src={meatballs}
              alt="보드 더보기"
              onClick={toggleProjectDropdownMenu}
            />
            <WorkBoardDropdownMenu
              isOpen={isOpenProjectDropdownMenu}
              projectId={projectId}
              taskId={task.taskId}
            />
          </MeatBalls>
        </TaskBoardHeader>
        <TaskBoardContent
          onClick={() => {
            openModal(UpdateTaskModal);
          }}
        >
          <Description>
            <Typography variant="paragraph" color="black">
              {task.description}
            </Typography>
          </Description>
          <BarGraph>
            <span>12/24</span>
            <span>50%</span>
          </BarGraph>
        </TaskBoardContent>
        <TaskBoardFooter>
          <TaskBoardMemberList></TaskBoardMemberList>
          <TaskBoardPeriod>
            <img src={Dday} alt="D-Day" />
          </TaskBoardPeriod>
        </TaskBoardFooter>
        <SubTask>
          <Icon>
            <WorkboxIcon stroke={vars.sementic.color.black70} />
          </Icon>
          <Typography variant="heading-5" color="black70">
            하위업무
          </Typography>
        </SubTask>
      </StyledTaskBoard>
    </>
  );
};

export default TaskBoard;
