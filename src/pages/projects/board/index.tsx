import { useOutletContext } from 'react-router-dom';

import { RawProject } from '@customTypes/project';
import { EmptyList } from '@pages/projects/components/EmptyList';
import ProjectBoardItem from '@pages/projects/components/ProjectBoardItem';

import StyleProjectBoards from './ProjectBoards.style';

const ProjectBoards = () => {
  const { projectData } = useOutletContext<{
    projectData: RawProject[];
  }>();

  return (
    <>
      <StyleProjectBoards.Wrapper>
        {!projectData || projectData.length === 0 ? (
          <EmptyList />
        ) : (
          <StyleProjectBoards.BoardList>
            {projectData?.map((project) => (
              <ProjectBoardItem key={project.projectId} project={project} />
            ))}
          </StyleProjectBoards.BoardList>
        )}
      </StyleProjectBoards.Wrapper>
    </>
  );
};

export default ProjectBoards;
