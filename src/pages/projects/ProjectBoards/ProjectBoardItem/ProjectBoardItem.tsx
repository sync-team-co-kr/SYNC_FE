import React from 'react';

import projectCalendar from '@assets/calendar.svg';
import meatballs from '@assets/meatballs.svg';
import projectIcon from '@assets/project-icon.png';
import { Typography } from '@components/common';
import { Project } from '@customTypes/project';
import useDropdown from '@hooks/useDropdown';
import ProjectSettingsDropdown from '@pages/projects/ProjectSettingsDropdown/ProjectSettingsDropdown';
import generateNormalDate from '@utils/generateNormalDate';
import styled from 'styled-components';

import StyleProjectBoard from './ProjectBoardItem.style';

const MeatBalls = styled.div`
  cursor: pointer;
  position: relative;
`;

const ProjectBoardItem = ({ project }: { project: Project }) => {
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
        <StyleProjectBoard.Period>
          <img src={projectCalendar} alt="프로젝트 기간" />
          <p>{generateNormalDate(project.startDate, project.endDate)}</p>
        </StyleProjectBoard.Period>
      </StyleProjectBoard.Footer>
    </StyleProjectBoard.BoardArea>
  );
};

export default ProjectBoardItem;

/*
  
  interface Member {
    profileImg: string;
    userId: string;
    username: string;
  }

  interface APIResponse {
    value: Member;
  }

  const MemberProfile = ({ memberId }: { memberId: number }) => {
  const [member, setMember] = useState<Member | null>(null);
  const fetchMemberDetail = async (userId: number) => {
    const response: AxiosResponse<APIResponse, any> =
      await requiredJwtTokeninstance.get(`/api/user/info`, {
        params: {
          userId,
        },
      });
    return response;
  };

  useEffect(() => {
    fetchMemberDetail(memberId).then((res) => setMember(res.data.value));
  }, []);

  return <li>{member?.username.slice(-2)}</li>;
};


  project.memberIds.map((memberId) => (
    <MemberProfile key={project.projectId} memberId={memberId} />
  ))
*/
