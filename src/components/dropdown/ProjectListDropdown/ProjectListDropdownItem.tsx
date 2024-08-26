import { Typography } from '@components/common';
import { useGetProject } from '@services/project/Project.hooks';

import { DropdownItem, DropdownItemText, ImageWrapper } from './style';

interface ProjectDropdownItemProps {
  projectId: number;
}

export const ProjectDropdownItem = ({
  projectId,
}: ProjectDropdownItemProps) => {
  const { projectData } = useGetProject(projectId);

  if (!projectData) return null;

  return (
    <DropdownItem>
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
