import React from 'react';
import * as FaIconList from 'react-icons/fa';

import projectCalendar from '@assets/calendar.svg';
import meatballs from '@assets/meatballs.svg';
import projectIcon from '@assets/project-icon.png';
import { ReactComponent as CheckBox } from '@assets/projects/checkBox.svg';
import { RawProject } from '@customTypes/project';
import useDropdown from '@hooks/useDropdown';
import ProjectSettingsDropdown from '@pages/projects/components/ProjectSettingsDropdown/ProjectSettingsDropdown';
// import { useGetTasks } from '@services/task';
import generateNormalDate from '@utils/generateNormalDate';
import styled from 'styled-components';
import { vars } from 'token';

import StyleProjectBoard from './ProjectBoardItem.style';

const MeatBalls = styled.div`
  cursor: pointer;
  position: relative;
`;

const ThumbnailWrapper = styled.div`
  width: 28px;
  height: 28px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MemberItem = styled.li`
  width: 28px;
  height: 28px;
  padding: 5px 1px;
  background: ${vars.sementic.color.lightBlue};
  border-radius: 100%;
  font-size: 12px;
  font-weight: 700;
  color: ${vars.sementic.color.positiveBlue};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProgressFrame = styled.div`
  display: flex;
  height: 64px;
  width: 100%;
  /* padding: 12px 16px; */
  align-items: center;
  gap: 8px;
  /* border-bottom: 1px solid var(--Black-White-Black-10, #f4f4f4); */
  background: #fff;
  /* width: 311px; */
`;

const BarGraph = styled.div`
  display: flex;
  width: 100%;
  /* width: 279px; */
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const BarGraphFrame1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const IndexFrame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const CheckIcon = styled.svg`
  width: 12px;
  height: 12px;
`;

const CheckText = styled.div`
  color: var(--Black-White-Black-20, #bfbfbf);
  text-align: center;

  /* Small Text_B */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 14px; /* 116.667% */
`;

const PercentText = styled.div`
  color: var(--Black-White-Black-100, #202020);
  text-align: center;

  /* Small Text_B */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 14px; /* 116.667% */
`;

const BarGraphFrame2 = styled.div`
  display: flex;
  height: 12px;
  width: 100%;
  border-radius: 2px;
  background: var(--Black-White-Black-10, #f4f4f4);
`;

const ProgressGraph = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  align-self: stretch;
  border-radius: 2px;
  background: var(--Primary-Orange-Yellow-Orange, #ffd880);
`;

const DescriptionFrame = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; /* -webkit- 접두사는 크로스브라우징을 위해 추가 */
  -webkit-line-clamp: 2; /* 보여질 줄 수  */
  -webkit-box-orient: vertical;
  font-size: 14px;
`;

const ProjectThumbnail = ({
  thumbnail,
  thumbnailType,
}: Pick<RawProject, 'thumbnail' | 'thumbnailType'>) => {
  switch (thumbnailType) {
    case 'E': // 이모지
      return <ThumbnailWrapper>{thumbnail}</ThumbnailWrapper>;
    case 'C': // 아이콘
      return (
        <ThumbnailWrapper>
          {Object.entries(FaIconList)
            .filter(([iconName]) => iconName === thumbnail)
            .map(([iconName, Icon]) => (
              <div key={iconName}>
                <Icon size="24" />
              </div>
            ))}
        </ThumbnailWrapper>
      );
    case 'I': // 이미지
      return (
        <img
          src={`https://user.sync-team.co.kr:30443/node2/api/task/image?filename=/mnt/oraclevdb/project/title/${thumbnail}`}
          alt="커스텀 이미지"
        />
      );
    default:
      return <img src={projectIcon} alt="프로젝트 대표 아이콘" />;
  }
};

const ProjectBoardItem = ({ project }: { project: RawProject }) => {
  const [
    isOpenProjectDropdownMenu,
    toggleProjectDropdownMenu,
    projectDropdownMenuRef,
  ] = useDropdown();

  // 진행 중 / 완료
  const progressValue =
    project.task && project.task.totalCount !== 0
      ? `${project.task.completedCount} / ${project.task.totalCount}`
      : `0 / 0`;

  // 프로젝트 진행도 계산
  const progressPercent = () => {
    if (project.task && project.task.totalCount !== 0) {
      const completedCount = Number(project?.task.completedCount);
      const totalCount = Number(project?.task.totalCount);
      return ((completedCount / totalCount) * 100).toFixed(0);
    }
    return 0;
  };

  return (
    <StyleProjectBoard.BoardArea key={project.projectId}>
      <StyleProjectBoard.Header>
        <ProjectThumbnail
          thumbnail={project.thumbnail}
          thumbnailType={project.thumbnailType}
        />
        <StyleProjectBoard.Title>
          <h5>{project.subTitle}</h5>
          <h2>{project.title}</h2>
        </StyleProjectBoard.Title>
        <MeatBalls ref={projectDropdownMenuRef}>
          <img
            src={meatballs}
            alt="보드 더보기"
            onClick={toggleProjectDropdownMenu}
          />
          <ProjectSettingsDropdown
            isOpen={isOpenProjectDropdownMenu}
            projectId={project.projectId}
          />
        </MeatBalls>
      </StyleProjectBoard.Header>

      <DescriptionFrame>{project.description}</DescriptionFrame>

      <ProgressFrame>
        <BarGraph>
          <BarGraphFrame1>
            <IndexFrame>
              <CheckIcon>
                <CheckBox />
              </CheckIcon>
              {/* {!tasks ? <CheckText>0/0</CheckText> : <CheckText>완료된 프로젝트 / 전체 프로젝트</CheckText>} */}
              <CheckText>{progressValue}</CheckText>
            </IndexFrame>
            <PercentText>{progressPercent()} %</PercentText>
          </BarGraphFrame1>
          <BarGraphFrame2>
            <ProgressGraph width={`${progressPercent()}%`} />
          </BarGraphFrame2>
        </BarGraph>
      </ProgressFrame>

      <StyleProjectBoard.Footer>
        <StyleProjectBoard.Members>
          {project.members.map((member) => (
            <MemberItem key={member.id}>
              {member?.username?.substring(1)}
            </MemberItem>
          ))}
        </StyleProjectBoard.Members>
        <StyleProjectBoard.Period>
          <img src={projectCalendar} alt="프로젝트 기간" />
          <p>
            {generateNormalDate(
              new Date(project.startDate || 1),
              new Date(project.endDate || 1),
            )}
          </p>
        </StyleProjectBoard.Period>
      </StyleProjectBoard.Footer>
    </StyleProjectBoard.BoardArea>
  );
};

export default ProjectBoardItem;
