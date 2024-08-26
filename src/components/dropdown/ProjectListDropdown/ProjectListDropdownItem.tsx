import { Typography } from '@components/common';
import { useTaskWithProjectActions } from '@libs/store/task/project';
import { useGetProject } from '@services/project/Project.hooks';

import { DropdownItem, DropdownItemText, ImageWrapper } from './style';

interface ProjectDropdownItemProps {
  projectId: number;
}

export const ProjectDropdownItem = ({
  projectId,
}: ProjectDropdownItemProps) => {
  const { projectData } = useGetProject(projectId);

  const { setProjects } = useTaskWithProjectActions();

  if (!projectData) return null;

  const handleProjectClick = () => {
    setProjects([projectData]);
  };

  return (
    <DropdownItem onClick={handleProjectClick}>
      <ImageWrapper></ImageWrapper>
      <DropdownItemText>
        <Typography variant="heading-4" color="black">
          {projectData.title}
        </Typography>
        <Typography variant="small-text-b" color="black35">
          {projectData.subTitle}
        </Typography>
      </DropdownItemText>
    </DropdownItem>
  );
};
