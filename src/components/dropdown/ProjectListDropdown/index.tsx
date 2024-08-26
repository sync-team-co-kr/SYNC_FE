import { ProjectListDropdownProps } from './types';

export const ProjectListDropdown = ({
  isOpen,
  setClose,
  ref,
}: ProjectListDropdownProps) => {
  if (!isOpen) return null;

  return (
    <div ref={ref}>
      {isOpen && (
        <div>
          <p>ProjectListDropdown</p>
        </div>
      )}
    </div>
  );
};
