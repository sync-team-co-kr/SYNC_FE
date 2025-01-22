import { Link, useLocation } from 'react-router-dom';

import { ReactComponent as CalendarIcon } from '@assets/sideBar/calender-icon.svg';
import { ReactComponent as HomeIcon } from '@assets/sideBar/home-icon.svg';
import { ReactComponent as Logo } from '@assets/sideBar/logo.svg';
import { ReactComponent as PlusIcon } from '@assets/sideBar/plus-icon.svg';
import { ReactComponent as ProjectIcon } from '@assets/sideBar/project-icon.svg';
import { CreateTaskModal } from '@components/modal/CreateTaskModal';
import { useModal } from '@hooks';
import styled from 'styled-components';
import { vars } from 'token';

const SideBarWrap = styled.aside`
  display: flex;
  width: 80px;
  height: 100vh;
  border-right: 1px solid ${vars.sementic.color.black10};
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  position: fixed;
  background: ${vars.sementic.color.white};
`;

const LogoWrapper = styled.div`
  display: flex;
  padding: 8px;
  width: 100%;
  height: 60px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  align-self: stretch;
`;

const SideBarCombine = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 32px;
`;

const SideBarItemWrap = styled.div`
  display: flex;
  padding: 12px;
  justify-content: center;
  align-items: center;

  svg {
    &:hover {
      transition: all 0.3s;
      cursor: pointer;
      stroke: ${vars.sementic.color.primaryOrange};
    }
  }
`;

export default function SideBar() {
  const location = useLocation();

  const [openModal] = useModal();

  // location 이 활성화 됨에 따라 색상 변경

  return (
    <SideBarWrap>
      {/* Logo */}
      <LogoWrapper>
        <Link to="/">
          <Logo />
        </Link>
      </LogoWrapper>
      {/* SideBarMenus */}
      <SideBarCombine>
        <SideBarItemWrap
          onClick={() => {
            openModal(CreateTaskModal);
          }}
        >
          <PlusIcon fill="transparent" stroke={vars.sementic.color.black20} />
        </SideBarItemWrap>

        <SideBarItemWrap>
          <Link to="/home">
            <HomeIcon
              fill="transparent"
              stroke={
                location.pathname === '/home'
                  ? vars.sementic.color.primaryOrange
                  : vars.sementic.color.black20
              }
            />
          </Link>
        </SideBarItemWrap>

        <SideBarItemWrap>
          <Link to="/projects/board">
            <ProjectIcon
              fill="transparent"
              stroke={
                location.pathname.includes('/projects')
                  ? vars.sementic.color.primaryOrange
                  : vars.sementic.color.black20
              }
            />
          </Link>
        </SideBarItemWrap>

        <SideBarItemWrap>
          <Link to="/calendars">
            <CalendarIcon
              fill="transparent"
              stroke={
                location.pathname.includes('/calendars')
                  ? vars.sementic.color.primaryOrange
                  : vars.sementic.color.black20
              }
            />
          </Link>
        </SideBarItemWrap>
      </SideBarCombine>
    </SideBarWrap>
  );
}
