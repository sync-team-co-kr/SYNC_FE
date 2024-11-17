import { useOutletContext } from 'react-router-dom';

import { ProjectListItem } from '@components/project';
import { RawProject } from '@customTypes/project';
import { EmptyList } from '@pages/projects/components/EmptyList';

import StyleProjectList, {
  DescriptionHeader,
  EtcHeader,
  ManagerHeader,
  ProgressHeader,
  RemainTimeHeader,
  TitleHeader,
} from './ProjectList.style';

const ProjectList = () => {
  const { filteredProjects } = useOutletContext<{
    filteredProjects: RawProject[];
  }>();

  return (
    <StyleProjectList.Wrapper>
      {!filteredProjects || filteredProjects.length === 0 ? (
        <EmptyList />
      ) : (
        <StyleProjectList.List>
          <StyleProjectList.ProjectListHeader>
            <TitleHeader>
              <StyleProjectList.ProjectListHeaderText>
                프로젝트명
              </StyleProjectList.ProjectListHeaderText>
            </TitleHeader>

            <DescriptionHeader>
              <StyleProjectList.ProjectListHeaderText>
                설명
              </StyleProjectList.ProjectListHeaderText>
            </DescriptionHeader>

            <ProgressHeader>
              <StyleProjectList.ProjectListHeaderText>
                진행률
              </StyleProjectList.ProjectListHeaderText>
            </ProgressHeader>

            <ManagerHeader>
              <StyleProjectList.ProjectListHeaderText>
                담당자
              </StyleProjectList.ProjectListHeaderText>
            </ManagerHeader>

            <RemainTimeHeader>
              <StyleProjectList.ProjectListHeaderText>
                남은 기간
              </StyleProjectList.ProjectListHeaderText>
            </RemainTimeHeader>
            <EtcHeader />
          </StyleProjectList.ProjectListHeader>

          {filteredProjects?.map((project) => (
            <ProjectListItem key={project.projectId} project={project} />
          ))}
        </StyleProjectList.List>
      )}
    </StyleProjectList.Wrapper>
  );
};

export default ProjectList;
