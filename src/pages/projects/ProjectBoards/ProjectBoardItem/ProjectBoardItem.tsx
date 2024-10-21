import React from 'react';

import projectCalendar from '@assets/calendar.svg';
import meatballs from '@assets/meatballs.svg';
import projectIcon from '@assets/project-icon.png';
import { Typography } from '@components/common';
import Avatar from '@components/member/Avatar';
import { RawProject } from '@customTypes/project';
import useDropdown from '@hooks/useDropdown';
import ProjectSettingsDropdown from '@pages/projects/ProjectSettingsDropdown/ProjectSettingsDropdown';
import generateNormalDate from '@utils/generateNormalDate';
import styled from 'styled-components';

import StyleProjectBoard from './ProjectBoardItem.style';

const MeatBalls = styled.div`
  cursor: pointer;
  position: relative;
`;

const ProjectBoardItem = ({ project }: { project: RawProject }) => {
  const [
    isOpenProjectDropdownMenu,
    toggleProjectDropdownMenu,
    projectDropdownMenuRef,
  ] = useDropdown();

  return (
    <StyleProjectBoard.BoardArea key={project.projectId}>
      <StyleProjectBoard.Header>
        <img src={projectIcon} alt="프로젝트 대표 아이콘" />
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

      <Typography variant="paragraph" color="black">
        {project.description}
      </Typography>

      <StyleProjectBoard.Footer>
        <StyleProjectBoard.Members>
          {project.members &&
            project.members.map((member) => (
              <Avatar key={member.id} member={member} />
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
