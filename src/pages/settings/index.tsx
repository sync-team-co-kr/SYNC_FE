import { Link, Outlet, useLocation } from 'react-router-dom';

import { ReactComponent as MemberSVG } from '@assets/settings/members.svg';
import { ReactComponent as ProjectSVG } from '@assets/settings/projects.svg';
import { ReactComponent as MyProfileSVG } from '@assets/settings/users.svg';
import styled from 'styled-components';
import { vars } from 'token';

const BackGround = styled.div`
  height: 100%;
  min-height: 840px;
  padding: 32px 40px;
  background-color: ${vars.sementic.color.primaryLightOrange};
  border: 1px solid #d2dbe2;
  display: flex;
`;

const SettingsContainer = styled.section`
  width: 100%;
  min-height: calc(100vh - 164px);
  background-color: ${vars.sementic.color.white};
  border: 1px solid #d2dbe2;
  display: flex;
`;

const SettingsMenu = styled.ul`
  width: 237px;
  height: 100%;
  padding: 24px;
  background-color: ${vars.sementic.color.white};
  border-right: 1px solid var(--New-group-Gray, #d2dbe2);
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const SettingsMenuItem = styled.li<{ $matchpathname: boolean }>`
  a {
    padding: 12px 16px;
    background-color: ${(props) =>
      props.$matchpathname
        ? vars.sementic.color.primaryLightOrange
        : vars.sementic.color.white};
    border: 1px solid
      ${(props) =>
        props.$matchpathname
          ? vars.sementic.color.primaryOrange
          : vars.sementic.color.white};
    border-radius: 4px;
    font-size: ${vars.sementic.typography.paragraph};
    font-weight: 700;
    color: ${(props) =>
      props.$matchpathname
        ? vars.sementic.color.black
        : vars.sementic.color.black20};
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const SettingsContentContainer = styled.section`
  width: calc(100% - 237px);
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export default function Settings() {
  const { pathname } = useLocation();

  return (
    <BackGround>
      <SettingsContainer>
        <SettingsMenu>
          <SettingsMenuItem $matchpathname={pathname === '/settings/profile'}>
            <Link to="/settings/profile">
              <MyProfileSVG />
              <span>내 계정</span>
            </Link>
          </SettingsMenuItem>

          <SettingsMenuItem $matchpathname={pathname === '/settings/project'}>
            <Link to="/settings/project">
              <ProjectSVG />
              <span>프로젝트 설정</span>
            </Link>
          </SettingsMenuItem>

          <SettingsMenuItem $matchpathname={/settings\/members/.test(pathname)}>
            <Link to="/settings/members/member">
              <MemberSVG />
              <span>사용자 관리</span>
            </Link>
          </SettingsMenuItem>
        </SettingsMenu>
        <SettingsContentContainer>
          <Outlet />
        </SettingsContentContainer>
      </SettingsContainer>
    </BackGround>
  );
}
