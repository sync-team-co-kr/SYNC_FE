import { useGetProjectList } from '@services/project/Project.hooks';
import { styled } from 'styled-components';

import ProjectAddButton from './common/ProjectAddButton';
import ProjectFilterButton from './common/ProjectFilterButton';
import ProjectSearchInput from './common/ProjectSearchInput';

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
  updateSearchQuery: (query: string) => void;
};

const ProjectToolbar = ({
  searchQuery,
  updateSearchQuery,
}: UseDataHandlerType) => {
  const { projectListData } = useGetProjectList();

  return (
    <Container>
      <ProjectSearchInput
        projectListData={projectListData || []}
        searchQuery={searchQuery}
        updateSearchQuery={updateSearchQuery}
      />

      <ButtonContainer>
        <ProjectAddButton />
        <ProjectFilterButton />
      </ButtonContainer>
    </Container>
  );
};

export default ProjectToolbar;
