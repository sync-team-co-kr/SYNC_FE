import React from 'react';
import * as FaIconList from 'react-icons/fa';

import projectCalendar from '@assets/calendar.svg';
import meatballs from '@assets/meatballs.svg';
import projectIcon from '@assets/project-icon.png';
import { Typography } from '@components/common';
import { RawProject } from '@customTypes/project';
import useDropdown from '@hooks/useDropdown';
import ProjectSettingsDropdown from '@pages/projects/components/ProjectSettingsDropdown/ProjectSettingsDropdown';
import generateNormalDate from '@utils/generateNormalDate';
import styled from 'styled-components';

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

      <Typography variant="paragraph" color="black">
        {project.description}
      </Typography>

      <StyleProjectBoard.Footer>
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
