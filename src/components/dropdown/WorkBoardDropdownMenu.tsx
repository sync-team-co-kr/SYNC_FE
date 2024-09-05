import arrow from '@assets/projects/arrow-down.svg';
import trashcan from '@assets/trashcan.svg';
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

interface WorkDropdownMenuPRops {
  isOpen: boolean;
}

const WorkBoardDropdownMenu = ({
  isOpen,
}: WorkDropdownMenuPRops) => {


  return (
    <Wrapper $isopen={isOpen}>
      <ProjectDropdownMenuList>
        <li>
          <img src={trashcan} alt="업무 삭제" />
          <span>업무 삭제</span>
        </li>
        <li>
          <img src={arrow} alt="맨밑으로 이동" />
          <span>맨밑으로 이동</span>
        </li>
      </ProjectDropdownMenuList>
    </Wrapper>
  );
};

export default WorkBoardDropdownMenu;
