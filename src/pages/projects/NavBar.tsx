import styled from 'styled-components';
import { vars } from 'token';

const TabMenu = styled.ul`
  margin-bottom: 20px;
  padding: 12px 0 0 40px;
  display: flex;
  border-bottom: 1px solid ${vars.sementic.color.black10};
  li {
    padding: 12px 24px;
    font-weight: 600;
    cursor: pointer;
  }
`;

const TabMenuItem = styled.li<{ $iscurrenttabmenu: boolean }>`
  border-bottom: ${(props) =>
    props.$iscurrenttabmenu
      ? `2px solid ${vars.sementic.color.primaryOrange}`
      : 'none'};
  color: ${(props) => (props.$iscurrenttabmenu ? '#202020' : '#8f8f8f')};
`;

const NavBar = ({ handleClickTabMenu, currentTabMenu }: any) => {
  return (
    <TabMenu>
      <TabMenuItem
        onClick={() => handleClickTabMenu('board')}
        $iscurrenttabmenu={currentTabMenu === 'board'}
      >
        <span>보드</span>
      </TabMenuItem>
      <TabMenuItem
        onClick={() => handleClickTabMenu('list')}
        $iscurrenttabmenu={currentTabMenu === 'list'}
      >
        <span>리스트</span>
      </TabMenuItem>
    </TabMenu>
  );
};

export default NavBar;
