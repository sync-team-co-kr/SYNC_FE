import { ReactComponent as Settings } from '@assets/Settings.svg';
import { ReactComponent as TrashCan } from '@assets/trashcan.svg';
import { ReactComponent as Withdraw } from '@assets/withdraw.svg';
import {
  DropdownItemList,
  DropdownWrapper,
} from '@components/dropdown/Dropdown.style';
import DropdownItem from '@components/dropdown/DropdownItem';
import useModal from '@hooks/useModal';
import DeleteProjectModal from '@pages/projects/components/DeleteProjectModal/DeleteProjectModal';
import ModifyProjectModal from '@pages/projects/components/ModifyProjectModal/ModifyProjectModal';

interface ProjectSettingsDropdownProps {
  isOpen: boolean;
  projectId: number;
}

const ProjectSettingsDropdown = ({
  isOpen,
  projectId,
}: ProjectSettingsDropdownProps) => {
  const [openModal] = useModal();

  return (
    <DropdownWrapper $width={249} $isopen={isOpen} $positionLeft={-220}>
      <DropdownItemList>
        <DropdownItem
          text="프로젝트 삭제"
          Icon={TrashCan}
          onClick={() => openModal(() => DeleteProjectModal({ projectId }))}
        />
        <DropdownItem
          text="프로젝트 설정"
          Icon={Settings}
          onClick={() => {
            openModal(() => ModifyProjectModal({ projectId }));
          }}
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
