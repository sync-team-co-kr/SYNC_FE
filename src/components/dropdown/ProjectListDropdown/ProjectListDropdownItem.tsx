import Thumbnail from '@components/Thumbnail/Thumbnail';
import { Typography } from '@components/common';
import { useBreadCrumbActions } from '@libs/store/breadcrumb/breadcrumb';
import { useTaskActions } from '@libs/store/task/task';
import { useGetProject } from '@services/project/Project.hooks';

import { DropdownItem, DropdownItemText } from './style';

interface ProjectDropdownItemProps {
  projectId: number;
}

export const ProjectDropdownItem = ({
  projectId,
}: ProjectDropdownItemProps) => {
  const { project } = useGetProject(projectId);

  const { setProject } = useTaskActions();
  const { setProjectRoute } = useBreadCrumbActions();

  if (!project) return null;

  const handleProjectClick = () => {
    setProject(project);
    setProjectRoute(project.title);
  };

  return (
    <DropdownItem onClick={handleProjectClick}>
      <Thumbnail
        thumbnail={project.thumbnail}
        thumbnailType={project.thumbnailType}
      />
      <DropdownItemText>
        <Typography variant="heading-4" color="black">
          {project.title}
        </Typography>
        <Typography variant="small-text-b" color="black35">
          {project.subTitle}
        </Typography>
      </DropdownItemText>
    </DropdownItem>
  );
};
