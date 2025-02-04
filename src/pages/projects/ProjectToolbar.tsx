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
  searchQuery: string;
  searchFilteredProjects: (query: string) => void;
  getUpcomingProjects: () => void;
  getMyProjects: () => void;
};

const ProjectToolbar = ({
  searchQuery,
  searchFilteredProjects,
  getUpcomingProjects,
  getMyProjects,
}: UseDataHandlerType) => (
  <Container>
    <ProjectSearchInput
      searchQuery={searchQuery}
      searchFilteredProjects={searchFilteredProjects}
    />

    <ButtonContainer>
      <ProjectAddButton />
      <ProjectFilterButton
        getUpcomingProjects={getUpcomingProjects}
        getMyProjects={getMyProjects}
      />
    </ButtonContainer>
  </Container>
);

export default ProjectToolbar;
