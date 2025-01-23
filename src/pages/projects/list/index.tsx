import { useOutletContext } from 'react-router-dom';

import projectCalendar from '@assets/calendar.svg';
import meatballs from '@assets/meatballs.svg';
import { ReactComponent as CheckBox } from '@assets/projects/checkBox.svg';
import Thumbnail from '@components/Thumbnail/Thumbnail';
import { RawProject } from '@customTypes/project';
import useDropdown from '@hooks/useDropdown';
import { EmptyList } from '@pages/projects/components/EmptyList';
import ProjectSettingsDropdown from '@pages/projects/components/ProjectSettingsDropdown/ProjectSettingsDropdown';
import generateNormalDate from '@utils/generateNormalDate';
import styled from 'styled-components';

import StyleProjectList from './ProjectList.style';

const MeatBalls = styled.div`
  cursor: pointer;
  position: relative;
`;

const ProgressGraph = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  align-self: stretch;
  border-radius: 2px;
  background: var(--Primary-Orange-Yellow-Orange, #ffd880);
`;

const ProjectList = () => {
  const { projectData } = useOutletContext<{
    projectData: RawProject[];
  }>();

  const [isOpenProjectDropdownMenu, toggleProjectDropdownMenu, dropdownRef] =
    useDropdown();

  // 진행 중 / 완료
  const progressValue = (task: {
    completedCount: number;
    totalCount: number;
  }) =>
    task && task.totalCount !== 0
      ? `${task.completedCount} / ${task.totalCount}`
      : `0 / 0`;

  // 프로젝트 진행도 계산
  const progressPercent = (task: {
    completedCount?: number;
    totalCount?: number;
  }) => {
    if (task && task.totalCount !== 0) {
      const completedCount = Number(task?.completedCount);
      const totalCount = Number(task?.totalCount);
      return ((completedCount / totalCount) * 100).toFixed(0);
    }
    return 0;
  };

  return (
    <StyleProjectList.Wrapper>
      {!projectData || projectData.length === 0 ? (
        <EmptyList />
      ) : (
        <StyleProjectList.List>
          <thead>
            <tr>
              <th className="ProjectTitle">프로젝트명</th>
              <th>설명</th>
              <th>진행률</th>
              <th className="ProjectMembers">담당자</th>
              <th className="ProjectCalendar">남은기간</th>
              <th className="Filter">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {projectData?.map((project) => (
              <tr key={project.projectId}>
                {/* 프로젝트명 */}
                <td>
                  <StyleProjectList.ProjectTitleText>
                    <Thumbnail
                      thumbnail={project.thumbnail}
                      thumbnailType={project.thumbnailType}
                    />
                    <div>
                      <div className="TitleText">{project.title}</div>
                      <div className="SubTitleText">{project.subTitle}</div>
                    </div>
                  </StyleProjectList.ProjectTitleText>
                </td>
                {/* 설명 */}
                <td>
                  <StyleProjectList.DescriptionText>
                    {project.description}
                  </StyleProjectList.DescriptionText>
                </td>
                {/* 진행률 */}
                <td>
                  <StyleProjectList.ProgressFrame>
                    <div>
                      <div className="BarGraphFrame1">
                        <div>
                          <svg>
                            <CheckBox />
                          </svg>

                          <div>
                            {project.task && progressValue(project.task)}
                          </div>
                        </div>
                        <div className="PercentText">
                          {project.task && progressPercent(project.task)} %
                        </div>
                      </div>
                      <div className="BarGraphFrame2">
                        <ProgressGraph
                          width={`${project.task && progressPercent(project.task)}%`}
                        />
                      </div>
                    </div>
                  </StyleProjectList.ProgressFrame>
                </td>
                {/* 담당자 */}
                <td>
                  <StyleProjectList.Members>
                    {project.members.map((member) => (
                      <li key={member.id}>{member?.username?.substring(1)}</li>
                    ))}
                  </StyleProjectList.Members>
                </td>
                {/* 남은기간 */}
                <td>
                  <StyleProjectList.Period>
                    <img src={projectCalendar} alt="프로젝트 기간" />
                    <p>
                      {generateNormalDate(
                        new Date(project.startDate || 1),
                        new Date(project.endDate || 1),
                      )}
                    </p>
                  </StyleProjectList.Period>
                </td>
                {/* 필터 */}
                <td>
                  <MeatBalls ref={dropdownRef}>
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
                </td>
              </tr>
            ))}
          </tbody>
        </StyleProjectList.List>
      )}
    </StyleProjectList.Wrapper>
  );
};

export default ProjectList;
