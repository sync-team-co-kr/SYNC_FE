import settings from '@assets/Settings.svg';
import trashcan from '@assets/trashcan.svg';
import withdraw from '@assets/withdraw.svg';
import { modalStore } from '@libs/store';
import DeleteProjectModal from '@pages/projects/components/DeleteProjectModal/DeleteProjectModal';
import ModifyProjectModal from '@pages/projects/components/ModifyProjectModal';
import styled from 'styled-components';

const Wrapper = styled.section<{ $isopen: boolean }>`
  width: 249px;
  padding: 12px 8px;
  background: #fff;
  border: 1px solid #b8b8b8;
  border-radius: 8px;
  box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.3);
  display: ${(props) => (props.$isopen ? 'flex' : 'none')};
  position: absolute;
  left: -220px;
`;

const ProjectDropdownMenuList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  li {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 6px;
    gap: 8px;
    align-self: stretch;
    img {
      width: 18px;
      height: 18px;
    }
    span {
      color: var(--Black-White-Black-100, #202020);
      /* Paragraph */
      font-family: Pretendard;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px; /* 142.857% */
    }
  }
`;

interface ProjectDropdownMenuPRops {
  isOpen: boolean;
  projectId: number;
}

const ProjectDropdownMenu = ({
  isOpen,
  projectId,
}: ProjectDropdownMenuPRops) => {
  const { openModal } = modalStore();

  return (
    <Wrapper $isopen={isOpen}>
      <ProjectDropdownMenuList>
        <li
          onClick={() => {
            openModal(() => DeleteProjectModal({ projectId }), '프로젝트 삭제');
          }}
        >
          <img src={trashcan} alt="프로젝트 삭제" />
          <span>프로젝트 삭제</span>
        </li>
        <li
          onClick={() => {
            openModal(() => ModifyProjectModal({ projectId }), '프로젝트 수정');
          }}
        >
          <img src={settings} alt="프로젝트 설정" />
          <span>프로젝트 설정</span>
        </li>
        <li>
          <img src={withdraw} alt="프로젝트 탈퇴" />
          <span>프로젝트 탈퇴</span>
        </li>
      </ProjectDropdownMenuList>
    </Wrapper>
  );
};

export default ProjectDropdownMenu;
