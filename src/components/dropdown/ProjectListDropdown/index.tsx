import { RefObject, forwardRef } from 'react';

import { useHandleOutsideHooks } from '@hooks/useHandleOutsideHooks';
import { useGetProjectList } from '@services/project/Project.hooks';

import { ProjectDropdownItem } from './ProjectListDropdownItem';
import { DropdownContainer } from './style';
import { ProjectListDropdownProps } from './types';

export const ProjectListDropdown = forwardRef<
  HTMLDivElement,
  ProjectListDropdownProps
>(({ isOpen, setClose }, ref) => {
  useHandleOutsideHooks(ref as RefObject<HTMLDivElement>, setClose);
  const { projectListData } = useGetProjectList();
  return (
    <DropdownContainer isOpen={isOpen} ref={ref}>
      {!!projectListData &&
        projectListData?.map((project) => (
          <ProjectDropdownItem
            key={project.projectId}
            projectId={project.projectId}
          />
        ))}
    </DropdownContainer>
  );
});
