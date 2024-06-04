import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MenuDropDown from '../dropdown/MenuDropDown';
import ConfigDropDown from '../dropdown/Config';

const HeaderWrap = styled.header`
  width: calc(100% - 242px);
  height: 68px;
  padding: 12px 34px;
  border-bottom: 2px solid black;
  position: fixed;
  left: 240px;
  top: 0;
  z-index: 50;
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

const SearchContainer = styled.li`
  width: 388px;
  height: 38px;
  flex-shrink: 0;
  position: relative;
`;

const SearchBar = styled.input`
  width: 388px;
  height: 38px;
  padding-left: 45px;
  flex-shrink: 0;
  border-radius: 19px;
  border: 1px solid var(--main-black, #000);
  background: #f5f6fa;
  &::placeholder {
    color: #202224;
    font-family: 'Nunito Sans';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const SearchSvg = styled.img`
  position: absolute;
  left: 16px;
  top: 10px;
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
  const profileMoreRef = useRef<HTMLDivElement>(null);
  const configRef = useRef<HTMLDivElement>(null);
  const [showsMenuDropdown, setShowsMenuDropdown] = useState(false);
  const [showsConfigDropdown, setShowsConfigDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleDetectDropdown = (e: React.BaseSyntheticEvent | MouseEvent) => {
      e.preventDefault();
      if (profileMoreRef.current && !profileMoreRef.current.contains(e.target))
        setShowsMenuDropdown(false);
      if (configRef.current && !configRef.current.contains(e.target))
        setShowsConfigDropdown(false);
    };
    document.addEventListener('click', handleDetectDropdown);
    return () => {
      document.removeEventListener('click', handleDetectDropdown);
    };
  }, []);

  useEffect(() => {
    setShowsMenuDropdown(false);
    setShowsConfigDropdown(false);
  }, [location.pathname]);

  return (
    <HeaderWrap>
      <Navigation>
        <HeaderList>
          <SearchContainer>
            <SearchBar type="text" placeholder="Search" />
            <SearchSvg src="/assets/search.svg" />
          </SearchContainer>
          <ToolContainer>
            <AlarmAndSetting>
              <img src="/assets/bell-02.svg" alt="알림" />
              <Config ref={configRef}>
                <img
                  src="/assets/Settings.svg"
                  alt="설정"
                  onClick={() =>
                    setShowsConfigDropdown((prevState) => !prevState)
                  }
                />
                <ConfigDropDown isActive={showsConfigDropdown} />
              </Config>
            </AlarmAndSetting>
            <ProfileWrap>
              <img src="/assets/man-438081_960_720.svg" alt="프로필 이미지" />
              <Profile>
                <UserInfo>
                  <UserInfoHeader>Name</UserInfoHeader>
                  <UserInfoFooter>UI Designer</UserInfoFooter>
                </UserInfo>
              </Profile>
              <More ref={profileMoreRef}>
                <img
                  src="/assets/More.svg"
                  alt="프로필 더 보기"
                  onClick={() =>
                    setShowsMenuDropdown((prevState) => !prevState)
                  }
                />
                <MenuDropDown isActive={showsMenuDropdown} />
              </More>
            </ProfileWrap>
          </ToolContainer>
        </HeaderList>
      </Navigation>
    </HeaderWrap>
  );
}
