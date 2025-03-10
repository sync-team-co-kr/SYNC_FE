import React from 'react';

import { ReactComponent as Settings } from '@assets/Settings.svg';
import { ReactComponent as TrashCan } from '@assets/trashcan.svg';
import { ReactComponent as Withdraw } from '@assets/withdraw.svg';
import {
  DropdownItemList,
  DropdownWrapper,
} from '@components/dropdown/Dropdown.style';
import DropdownItem from '@components/dropdown/DropdownItem';
import { modalStore } from '@libs/store';
import DeleteProjectModal from '@pages/projects/components/DeleteProjectModal/DeleteProjectModal';
import ModifyProjectModal from '@pages/projects/components/ModifyProjectModal';

interface ProjectSettingsDropdownProps {
  isOpen: boolean;
  closeDropdown: () => void;
  projectId: number;
}

const ProjectSettingsDropdown = ({
  isOpen,
  closeDropdown,
  projectId,
}: ProjectSettingsDropdownProps) => {
  const { openModal } = modalStore();

  const handleClickDeleteProjectSetting = (
    event: React.MouseEvent<HTMLLIElement>,
  ) => {
    event.stopPropagation();
    openModal(() => DeleteProjectModal({ projectId }), '프로젝트 삭제');
    closeDropdown();
  };

  const handleClickUpdateProjectSetting = (
    event: React.MouseEvent<HTMLLIElement>,
  ) => {
    event.stopPropagation();
    openModal(() => ModifyProjectModal({ projectId }), '프로젝트 수정');
    closeDropdown();
  };

  return (
    <DropdownWrapper $width={249} $isopen={isOpen} $positionLeft={-220}>
      <DropdownItemList>
        <DropdownItem
          text="프로젝트 삭제"
          Icon={TrashCan}
          onClick={handleClickDeleteProjectSetting}
        />
        <DropdownItem
          text="프로젝트 설정"
          Icon={Settings}
          onClick={handleClickUpdateProjectSetting}
        />
        <DropdownItem
          text="프로젝트 탈퇴"
          Icon={Withdraw}
          onClick={() => console.log('구현 예정')}
        />
      </DropdownItemList>
    </DropdownWrapper>
  );
};

export default ProjectSettingsDropdown;
