import { useOutletContext } from 'react-router-dom';

import { RawProject } from '@customTypes/project';
import { EmptyList } from '@pages/projects/common/EmptyList';
import ProjectBoardItem from '@pages/projects/common/ProjectBoardItem/ProjectBoardItem';

import StyleProjectBoards from './ProjectBoards.style';

const ProjectBoards = () => {
  const { filteredProjects } = useOutletContext<{
    filteredProjects: RawProject[];
  }>();

  return (
    <StyleProjectBoards.Wrapper>
      {!filteredProjects || filteredProjects.length === 0 ? (
        <EmptyList />
      ) : (
        <StyleProjectBoards.BoardList>
          {filteredProjects?.map((project) => (
            <ProjectBoardItem key={project.projectId} project={project} />
          ))}
        </StyleProjectBoards.BoardList>
      )}
    </StyleProjectBoards.Wrapper>
  );
};

export default ProjectBoards;
