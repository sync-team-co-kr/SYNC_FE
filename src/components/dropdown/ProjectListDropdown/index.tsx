import { RefObject, forwardRef } from 'react';

import { useHandleOutsideHooks } from '@hooks/useHandleOutsideHooks';
import { useGetProjects } from '@services/project/Project.hooks';

import { ProjectDropdownItem } from './ProjectListDropdownItem';
import { DropdownContainer } from './style';
import { ProjectListDropdownProps } from './types';

export const ProjectListDropdown = forwardRef<
  HTMLDivElement,
  ProjectListDropdownProps
>(({ isOpen, setClose }, ref) => {
  useHandleOutsideHooks(ref as RefObject<HTMLDivElement>, setClose);
  const { projects } = useGetProjects();
  return (
    <DropdownContainer $isopen={isOpen} ref={ref}>
      {!!projects &&
        projects?.map((project) => (
          <ProjectDropdownItem
            key={project.projectId}
            projectId={project.projectId}
          />
        ))}
    </DropdownContainer>
  );
});
