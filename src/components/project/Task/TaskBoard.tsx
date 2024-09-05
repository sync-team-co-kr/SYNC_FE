import styled from 'styled-components';
import workboardimg from '@assets/projects/workboard-image.png';
import Dday from '@assets/projects/d-day-img.png';
import bargraph from '@assets/projects/BarGrahph-img.png';
import meatballs from '@assets/meatballs.svg';
import WorkBoardDropdownMenu from '@components/dropdown/WorkBoardDropdownMenu';
import { ReactComponent as WorkboxIcon } from '@assets/projects/workbox.svg';
import { vars } from 'token';
import { Typography } from '@components/common/Typography';
import useDropdown from '@hooks/useDropdown';
import { useModal } from '@hooks';
import { UpdateTaskModal } from '../Task/UpdateTaskModal';

const ProjectBoard = styled.li`
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--Black-White-Black-10, #f4f4f4);
  background: var(--Black-White-White, #fff);
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 8px;
  cursor: pointer;  // 클릭 시 커서 변경
`;

const MeatBalls = styled.div`
  cursor: pointer;
  position: relative;
  display: none;
`;

const ProjectBoardHeader = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover ${MeatBalls} {
    display: block;
  }
`;

const Header = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  img {
    width: 24px;
    height: 24px;
  }
`;

const ProjectBoardContent = styled.div`
  height: auto;
`;

const ProjectBoardDescription = styled.p`
  height: auto;
`;

const BarGraph = styled.div`
  height: auto;
`;

const ProjectBoardFooter = styled.section`
  padding: 0 1px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProjectBoardMemberList = styled.ul`
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

const ProjectBoardPeriod = styled.div`
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


const TaskBoard = () => {
  const [
    isOpenProjectDropdownMenu,
    toggleProjectDropdownMenu,
    projectDropdownMenuRef,
  ] = useDropdown();

  const [openModal] = useModal();

  return (
    <>
      <ProjectBoard>
        <ProjectBoardHeader>
          <Header>
            <img src={workboardimg} alt="작업 보드" />
            <Typography variant="heading-4" color="black">업무제목</Typography>
          </Header>
          <MeatBalls ref={projectDropdownMenuRef}>
            <img
              src={meatballs}
              alt="보드 더보기"
              onClick={toggleProjectDropdownMenu}
            />
            <WorkBoardDropdownMenu
              isOpen={isOpenProjectDropdownMenu}
            />
          </MeatBalls>
        </ProjectBoardHeader>
        <ProjectBoardContent
          onClick={() => {openModal(UpdateTaskModal);}}>
          <ProjectBoardDescription>
            <Typography variant="paragraph" color="black">요약내용</Typography>
          </ProjectBoardDescription>
          <BarGraph>
            <img src={bargraph} alt="막대 그래프" />
          </BarGraph>
        </ProjectBoardContent>
        <ProjectBoardFooter>
          <ProjectBoardMemberList></ProjectBoardMemberList>
          <ProjectBoardPeriod>
            <img src={Dday} alt="D-Day" />
          </ProjectBoardPeriod>
        </ProjectBoardFooter>
        <SubTask>
          <Icon>
            <WorkboxIcon stroke={vars.sementic.color.black70} />
          </Icon>
          <Typography variant="heading-5" color="black70">하위업무</Typography>
        </SubTask>
      </ProjectBoard>
    </>
  );
};

export default TaskBoard;
