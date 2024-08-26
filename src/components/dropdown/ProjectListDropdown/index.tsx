import { RefObject, forwardRef } from 'react';

import { Typography } from '@components/common';
import { useHandleOutsideHooks } from '@hooks/useHandleOutsideHooks';
import { useGetProjectList } from '@services/project/Project.hooks';

import {
  DropdownContainer,
  DropdownItem,
  DropdownItemText,
  ImageWrapper,
} from './style';
import { ProjectListDropdownProps } from './types';

export const ProjectListDropdown = forwardRef<
  HTMLDivElement,
  ProjectListDropdownProps
>(({ isOpen, setClose }, ref) => {
  useHandleOutsideHooks(ref as RefObject<HTMLDivElement>, setClose);
  const projectList = useGetProjectList();

  return (
    <DropdownContainer isOpen={isOpen} ref={ref}>
      {!!projectList &&
        projectList?.projectListData?.map((project) => (
          <DropdownItem key={project.projectId}>
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
        ))}
    </DropdownContainer>
  );
});
