import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TabMenuItem from './TabMenu.types';

type useTabMenuType = (
  tabMenuList: TabMenuItem[],
) => [string, (e: React.MouseEvent<HTMLButtonElement>) => void];

const useTabMenu: useTabMenuType = (tabMenuList) => {
  const [activeTabMenu, setActiveTabMenu] = useState(
    tabMenuList[0].tabMenuName,
  );
  const [currentTabMenu, setCurrentTabMenu] = useState(
    tabMenuList[0].tabMenuName,
  );
  const navigate = useNavigate();

  const activateTabMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const [expectedRoute] = tabMenuList.filter(
      (tabMenuItem) => tabMenuItem.tabMenuName === e.currentTarget.name,
    );
    setActiveTabMenu(expectedRoute.tabMenuName);
    navigate(expectedRoute.route);
  };

  useEffect(() => {
    setCurrentTabMenu(activeTabMenu);
  }, [activeTabMenu]);

  return [currentTabMenu, activateTabMenu];
};

export default useTabMenu;
