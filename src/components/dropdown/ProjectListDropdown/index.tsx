import { RefObject, forwardRef } from 'react';

import { useHandleOutsideHooks } from '@hooks/useHandleOutsideHooks';

import { DropdownContainer } from './style';
import { ProjectListDropdownProps } from './types';

export const ProjectListDropdown = forwardRef<
  HTMLDivElement,
  ProjectListDropdownProps
>(({ isOpen, setClose }, ref) => {
  useHandleOutsideHooks(ref as RefObject<HTMLDivElement>, setClose);

  return (
    <DropdownContainer isOpen={isOpen} ref={ref}>
      <div>
        <p>ProjectListDropdown</p>
      </div>
    </DropdownContainer>
  );
});
