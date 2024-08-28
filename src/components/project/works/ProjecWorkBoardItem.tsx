import styled from 'styled-components';
import { Typography } from '@components/common/Typography';
import { ReactComponent as WorkboxIcon } from '@assets/projects/workbox.svg';
import { ReactComponent as CreateIcon } from '@assets/projects/create.svg';
import { useState } from 'react';
import { vars } from 'token';
import ProjectCreateWorkBoard from './ProjectCreateWorkBoard';
import WorkBoard from './WorkBoard';

// Props 타입 정의
interface ProjectWorkBoardContainerProps {
  borderColor?: string;
  backgroundColor?: string;
}

type TypographyColor = "negativeRed" | "primaryLightOrange" | "primaryOrange" | "black" | 
  "black70" | "black35" | "black20" | "black10" | "white" | "lightBlue" | "positiveBlue" | 
  "lightRed" | "alertLightOrange" | "lightPurple" | "purple";


const ProjectWorkBoardContainer = styled.li<ProjectWorkBoardContainerProps>`
  width: 414px;
  min-height: 100px;
  border-radius: 12px;
  border: 1px solid ${(props) => props.borderColor || vars.sementic.color.black10};
  background: ${(props) => props.backgroundColor || vars.sementic.color.lightRed};
  display: flex;
  flex-direction: column;
`;

const ProjectWorkBoardHeader = styled.section`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 8px;
`;

const ProjectWorkBoardTitle = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
  gap: 8px;
`;

const TitleDetail = styled.div`
  display: flex;
  justify-content: baseline;
  align-items: center;
  gap: 4px;
`;

const ProjectCreatWork = styled.button`
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

interface ProjectWorkBoardToDoProps {
  title?: string;
  count?: number;
  titleColor?: TypographyColor;  // 타입을 제한된 색상으로 지정
  borderColor?: string;
  backgroundColor?: string;
  workBoardVisible?: boolean;
}

const ProjectWorkBoardToDo = ({
  title = 'Title',
  count = 0,
  titleColor = 'negativeRed',
  borderColor,
  backgroundColor,
  // workBoardVisible = true,
}: ProjectWorkBoardToDoProps) => {
  const [isClicked, setIsClick] = useState(false);
  const [workBoards, setWorkBoards] = useState<any[]>([]); // 워크보드 상태

  const handleClick = (value: boolean | ((prevState: boolean) => boolean)) => {
    setIsClick(value);
  };

  const handleTaskCreated = (newTask: any) => {
    setWorkBoards([...workBoards, newTask]);
    setIsClick(false); // 작업 생성 후 창 닫기
  };

  return (
    <ProjectWorkBoardContainer borderColor={borderColor} backgroundColor={backgroundColor}>
      <ProjectWorkBoardHeader>
        <ProjectWorkBoardTitle>
          <Typography variant="heading-5" color={titleColor}>{title}</Typography>
          <TitleDetail>
            <WorkboxIcon stroke={vars.sementic.color[titleColor]} />
            <Typography variant="heading-4" color={titleColor}>{count + workBoards.length}</Typography>
          </TitleDetail>
        </ProjectWorkBoardTitle>
      </ProjectWorkBoardHeader>
      <WorkBoard/>
      {/* {workBoardVisible && workBoards.map((board, index) => (
        <WorkBoard key={index} {...board} />
      ))} */}
      {isClicked ? (
        <ProjectCreateWorkBoard onClose={() => handleClick(false)} onTaskCreated={handleTaskCreated} />
      ) : (
        <ProjectCreatWork onClick={() => handleClick(true)}>
          <Icon>
            <CreateIcon stroke={vars.sementic.color.black70} />
          </Icon>
          <Typography variant="heading-5" color="black70">업무 생성</Typography>
        </ProjectCreatWork>
      )}
    </ProjectWorkBoardContainer>
  );
};

export default ProjectWorkBoardToDo;
