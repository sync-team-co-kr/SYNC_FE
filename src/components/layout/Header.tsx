import more from '@assets/More.svg';
import { ReactComponent as Bell } from '@assets/header/bell-icon.svg';
import { ReactComponent as Setting } from '@assets/header/setting-icon.svg';
import profileDefault from '@assets/man-438081_960_720.svg';
import { ConfigDropDown, MenuDropDown } from '@components/dropdown';
import useDropdown from '@hooks/useDropdown';
import { useLoggedInUserStore } from '@libs/store';
import styled from 'styled-components';
import { vars } from 'token';

const HeaderWrap = styled.header`
  width: calc(100% - 80px);
  height: 68px;
  padding: 12px 34px;
  z-index: 5;
  border-bottom: 1px solid ${vars.sementic.color.black10};
  position: fixed;
  right: 0;
  top: 0;
  background: ${vars.sementic.color.white};
`;

const Navigation = styled.nav`
  width: 100%;
`;

const HeaderList = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconContainer = styled.div`
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    &:hover {
      transition: all 0.3s;
      cursor: pointer;
      stroke: ${vars.sementic.color.primaryOrange};
    }
  }
`;

const ToolContainer = styled.li`
  width: 250px;
  display: flex;
  align-items: center;
  gap: 30px;
`;

const AlarmAndSetting = styled.div`
  display: flex;
  gap: 16px;
`;

const ProfileWrap = styled.div`
  width: 182px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;
`;

const UserInfo = styled.p`
  width: 85px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
  img {
    width: 18px;
    height: 18px;
  }
`;

const UserInfoHeader = styled.span`
  color: #404040;
  font-family: 'Nunito Sans';
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const UserInfoFooter = styled.span`
  color: #565656;
  font-family: 'Nunito Sans';
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Config = styled.div`
  cursor: pointer;
  position: relative;
`;

const More = styled.div`
  cursor: pointer;
  position: relative;
`;

export default function Header() {
  const [isOpenProfileDropdown, toggleProfileDropdown, profileDropdownRef] =
    useDropdown();
  const [isOpenConfigDropdown, toggleConfigDropdown, configDropdownRef] =
    useDropdown();
  const { loggedInUser } = useLoggedInUserStore();

  return (
    <HeaderWrap>
      <Navigation>
        <HeaderList>
          <div></div>
          <ToolContainer>
            <AlarmAndSetting>
              <IconContainer>
                <Bell stroke={vars.sementic.color.black20} />
              </IconContainer>
              <Config ref={configDropdownRef}>
                <IconContainer onClick={toggleConfigDropdown}>
                  <Setting stroke={vars.sementic.color.black20} />
                </IconContainer>
                <ConfigDropDown isOpen={isOpenConfigDropdown} />
              </Config>
            </AlarmAndSetting>
            <ProfileWrap>
              <img src={profileDefault} alt="프로필 이미지" />
              <Profile>
                <UserInfo>
                  <UserInfoHeader>
                    {loggedInUser?.username || 'Name'}
                  </UserInfoHeader>
                  <UserInfoFooter>UI Designer</UserInfoFooter>
                </UserInfo>
              </Profile>
              <More ref={profileDropdownRef}>
                <img
                  src={more}
                  alt="프로필 더 보기"
                  onClick={toggleProfileDropdown}
                />
                <MenuDropDown isOpen={isOpenProfileDropdown} />
              </More>
            </ProfileWrap>
          </ToolContainer>
        </HeaderList>
      </Navigation>
    </HeaderWrap>
  );
}
