import defaultProjectImg from '@assets/project-icon.png';
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
          <div>
            {project.thumbnail ? (
              <span>{project.thumbnail}</span>
            ) : (
              <img src={defaultProjectImg} alt="프로젝트 기본 이미지" />
            )}
          </div>
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
