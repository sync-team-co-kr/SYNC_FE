import { useState } from 'react';

import { styled } from 'styled-components';
import { vars } from 'token';

const Container = styled.section<{ $isactive: boolean }>`
  height: 400px;
  padding: 12px;
  background: ${vars.sementic.color.white};
  border-radius: 18px;
  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.05);
  display: ${(props) => (props.$isactive ? 'inline-flex' : 'none')};
  flex-direction: column;
  gap: 18px;
  position: absolute;
`;

const TabMenuList = styled.ul`
  display: flex;
  flex-direction: row;
`;

const TabMenuItem = styled.li<{
  $name: string;
  $currentmenu: 'emoji' | 'icon' | 'custom';
}>`
  padding: 8px 30px;
  border-bottom: 2px solid
    ${(props) =>
      props.$name === props.$currentmenu
        ? vars.sementic.color.alertLightOrange
        : vars.sementic.color.black35};
  font-size: ${vars.sementic.typography.paragraph};
  color: ${(props) =>
    props.$name === props.$currentmenu
      ? vars.sementic.color.black
      : vars.sementic.color.black35};
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;
`;

interface ThumbnailDropdownProps {
  isOpen: boolean;
}

const ThumbnailDropdown = ({ isOpen }: ThumbnailDropdownProps) => {
  const [currentTabMenu, setCurrentTabMenu] = useState<
    'emoji' | 'icon' | 'custom'
  >('emoji');
  return (
    <Container $isactive={isOpen}>
      <TabMenuList>
        <TabMenuItem
          onClick={() => setCurrentTabMenu('emoji')}
          $name="emoji"
          $currentmenu={currentTabMenu}
        >
          이모지
        </TabMenuItem>
        <TabMenuItem
          onClick={() => setCurrentTabMenu('icon')}
          $name="icon"
          $currentmenu={currentTabMenu}
        >
          아이콘
        </TabMenuItem>
        <TabMenuItem
          onClick={() => setCurrentTabMenu('custom')}
          $name="custom"
          $currentmenu={currentTabMenu}
        >
          사용자 지정
        </TabMenuItem>
      </TabMenuList>
    </Container>
  );
};

export default ThumbnailDropdown;
