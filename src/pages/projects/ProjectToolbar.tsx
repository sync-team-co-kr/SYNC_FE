import { RawProject } from '@customTypes/project';
import { styled } from 'styled-components';

import ProjectAddButton from './components/ProjectAddButton';
import ProjectFilterButton from './components/ProjectFilterButton';
import ProjectSearchInput from './components/ProjectSearchInput';

const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 40px;
`;

const ButtonContainer = styled.section`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;

type UseDataHandlerType = {
  projectData: RawProject[];
  searchQuery: string;
  searchFilteredProjects: (query: string) => void;
  getUpcomingProjects: () => void;
};

const ProjectToolbar = ({
  projectData,
  searchQuery,
  searchFilteredProjects,
  getUpcomingProjects,
}: UseDataHandlerType) => (
  <Container>
    <ProjectSearchInput
      searchQuery={searchQuery}
      projectData={projectData}
      searchFilteredProjects={searchFilteredProjects}
    />

    <ButtonContainer>
      <ProjectAddButton />
      <ProjectFilterButton getUpcomingProjects={getUpcomingProjects} />
    </ButtonContainer>
  </Container>
);

export default ProjectToolbar;
