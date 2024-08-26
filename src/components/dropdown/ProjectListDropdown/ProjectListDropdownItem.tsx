import { Typography } from '@components/common';
import { useGetProject } from '@services/project/Project.hooks';

import { DropdownItem, DropdownItemText, ImageWrapper } from './style';

interface ProjectDropdownItemProps {
  projectId: number;
  title: string;
  subTitle: string;
}

export const ProjectDropdownItem = ({
  projectId,
  title,
  subTitle,
}: ProjectDropdownItemProps) => {
  const { projectData } = useGetProject(projectId);

  console.log(projectData);

  return (
    <DropdownItem>
      <ImageWrapper></ImageWrapper>
      <DropdownItemText>
        <Typography variant="heading-4" color="black">
          {title}
        </Typography>
        <Typography variant="small-text-b" color="black35">
          {subTitle}
        </Typography>
      </DropdownItemText>
    </DropdownItem>
  );
};
