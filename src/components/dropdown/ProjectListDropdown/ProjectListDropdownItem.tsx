import { Typography } from '@components/common';
import { useTaskActions } from '@libs/store/task/task';
import { useGetProject } from '@services/project/Project.hooks';

import { DropdownItem, DropdownItemText, ImageWrapper } from './style';

interface ProjectDropdownItemProps {
  projectId: number;
}

export const ProjectDropdownItem = ({
  projectId,
}: ProjectDropdownItemProps) => {
  const { project } = useGetProject(projectId);

  const { setProject } = useTaskActions();

  if (!project) return null;

  const handleProjectClick = () => {
    setProject(project);
  };

  return (
    <DropdownItem onClick={handleProjectClick}>
      <ImageWrapper></ImageWrapper>
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
