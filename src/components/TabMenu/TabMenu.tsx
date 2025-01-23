import { styled } from 'styled-components';
import { vars } from 'token';

import TabMenuItem from './TabMenu.types';
import useTabMenu from './useTabMenu';

const STabMenu = styled.ul`
  margin-bottom: 20px;
  padding: 12px 0 0 40px;
  display: flex;
  border-bottom: 1px solid ${vars.sementic.color.black10};
`;

const STabMenuItem = styled.li<{ $iscurrenttabmenu: boolean }>`
  border-bottom: ${(props) =>
    props.$iscurrenttabmenu
      ? `2px solid ${vars.sementic.color.primaryOrange}`
      : 'none'};
  color: ${(props) => (props.$iscurrenttabmenu ? '#202020' : '#8f8f8f')};
  button {
    padding: 12px 24px;
    background-color: transparent;
    border: none;
    font-weight: 600;
    cursor: pointer;
  }
`;

interface TabMenuProps {
  tabMenuList: TabMenuItem[];
}

const TabMenu = ({ tabMenuList }: TabMenuProps) => {
  const [currentTabMenu, activateTabMenu] = useTabMenu(tabMenuList);

  return (
    <STabMenu>
      {tabMenuList.map((tabMenuItem) => (
        <STabMenuItem
          key={tabMenuItem.route}
          $iscurrenttabmenu={currentTabMenu === tabMenuItem.tabMenuName}
        >
          <button name={tabMenuItem.tabMenuName} onClick={activateTabMenu}>
            {tabMenuItem.tabMenuName}
          </button>
        </STabMenuItem>
      ))}
    </STabMenu>
  );
};

export default TabMenu;
