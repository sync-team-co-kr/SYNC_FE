import Thumbnail from '@components/Thumbnail/Thumbnail';
import { RawProject } from '@customTypes/project';

import { NavigationItem, ProjectNavigatorDropdown } from './style';

interface ProjectNavigationProps {
  isOpen: boolean;
  projects?: RawProject[];
  handleSelectNavigationItem: (project: RawProject) => void;
}

const ProjectNavigation = ({
  isOpen,
  projects,
  handleSelectNavigationItem,
}: ProjectNavigationProps) => {
  return (
    <ProjectNavigatorDropdown $isopen={isOpen}>
      {projects?.map((project) => (
        <NavigationItem
          key={project.projectId}
          onClick={() => handleSelectNavigationItem(project)}
        >
          <Thumbnail
            thumbnail={project.thumbnail}
            thumbnailType={project.thumbnailType}
          />
          <div>
            <span>{project.title}</span>
            <span>{project.subTitle}</span>
          </div>
        </NavigationItem>
      ))}
    </ProjectNavigatorDropdown>
  );
};

export default ProjectNavigation;
