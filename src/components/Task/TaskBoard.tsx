import { useState } from 'react';
import { useDrag } from 'react-dnd';
import { useNavigate } from 'react-router-dom';

import meatballs from '@assets/meatballs.svg';
import workboardimg from '@assets/projects/workboard-image.png';
import { ReactComponent as WorkboxIcon } from '@assets/projects/workbox.svg';
import { Tag } from '@components/common/Tag';
import { Typography } from '@components/common/Typography';
import WorkBoardDropdownMenu from '@components/dropdown/WorkBoardDropdownMenu';
import { ITask } from '@customTypes/task';
import useDropdown from '@hooks/useDropdown';
import { modalStore } from '@libs/store';
import { useTaskActions } from '@libs/store/task/task';
import { differenceInDays } from 'date-fns';
import styled from 'styled-components';
import { vars } from 'token';

import { UpdateTaskModal } from './UpdateTaskModal';

const StyledTaskBoard = styled.section<{ $isaccent: boolean }>`
  padding: 12px;
  border-radius: 12px;
  border: 2px solid
    ${(props) =>
      props.$isaccent
        ? vars.sementic.color.primaryOrange
        : vars.sementic.color.black10};
  background: var(--Black-White-White, #fff);
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer; // 클릭 시 커서 변경
  transition: border 0.5s ease-in;
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
  gap: 6px;
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

const SubTaskNavigation = styled.button`
  height: 36px;
  background: ${vars.sementic.color.black10};
  border-radius: 8px;
  border: none;
  color: ${vars.sementic.color.black70};
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.5s ease-out;
  &:hover,
  &:focus {
    background: ${vars.sementic.color.black35};
  }
`;

const Icon = styled.div`
  margin: 0 8px 0 8px;
`;

const TaskBoard = ({ projectId, task }: { projectId: number; task: ITask }) => {
  const [
    isOpenProjectDropdownMenu,
    toggleProjectDropdownMenu,
    projectDropdownMenuRef,
  ] = useDropdown();
  const { setTitle, setDescription } = useTaskActions();
  const { openModal } = modalStore();

  const navigate = useNavigate();

  const [, drag] = useDrag(() => ({
    type: 'TaskBoard',
    item: { id: task.taskId, status: task.status },
  }));
  const [isAccent, setIsAccent] = useState(false);

  return (
    <>
      <StyledTaskBoard key={task.taskId} ref={drag} $isaccent={isAccent}>
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
              closeDropdown={toggleProjectDropdownMenu}
              projectId={projectId}
              taskId={task.taskId}
            />
          </MeatBalls>
        </TaskBoardHeader>
        <TaskBoardContent
          onMouseOver={() => setIsAccent(true)}
          onMouseOut={() => setIsAccent(false)}
          onFocus={() => setIsAccent(true)}
          onClick={(e) => {
            e.stopPropagation();
            setTitle(task.title);
            setDescription(task.description);

            openModal(
              () => UpdateTaskModal({ projectId, taskId: task.taskId }),
              '업무 수정',
            );
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
          <TaskBoardFooter>
            <TaskBoardMemberList></TaskBoardMemberList>
            <Tag
              type="dday"
              property={`D-${differenceInDays(task.endDate, new Date()) >= 1 ? differenceInDays(task.endDate, new Date()) : 0}`}
            />
          </TaskBoardFooter>
        </TaskBoardContent>

        {task.depth < 2 && (
          <SubTaskNavigation
            onClick={() => {
              if (task.depth === 1) {
                // id 대신 taskId로 요청
                navigate(`/projects/${projectId}/subTasks/${task.taskId}`);
              } else {
                navigate(`/projects/${projectId}/tasks/${task.taskId}`);
              }
            }}
          >
            <Icon>
              <WorkboxIcon stroke={vars.sementic.color.black70} />
            </Icon>
            <Typography variant="heading-5" color="black70">
              하위업무
            </Typography>
          </SubTaskNavigation>
        )}
      </StyledTaskBoard>
    </>
  );
};

export default TaskBoard;
