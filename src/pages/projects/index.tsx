import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import useProjectList from '@hooks/useProjectList';
import styled from 'styled-components';

const TabMenu = styled.ul`
  margin-bottom: 20px;
  display: flex;
  li {
    padding: 12px 24px;
    font-weight: 600;
    cursor: pointer;
  }
`;

const TabMenuItem = styled.li<{ $iscurrenttabmenu: boolean }>`
  border-bottom: ${(props) =>
    props.$iscurrenttabmenu ? '2px solid #cccc33' : 'none'};
  color: ${(props) => (props.$iscurrenttabmenu ? '#202020' : '#8f8f8f')};
`;

export interface IProject {
  projectId: number;
  title: string;
  subTitle: string;
  description: string;
  startDate: Date;
  endDate: Date;
  memberIds: number[];
}

const Project = () => {
  const [currentTabMenu, setCurrentTabMenu] = useState('board');
  const navigate = useNavigate();
  const projectList = useProjectList();
  console.log('프로젝트 목록', projectList);

  const handleClickTabMenu = (path: string) => {
    setCurrentTabMenu(path);
    navigate(`/projects/${path}`);
  };

  return (
    <section>
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
          리스트
        </TabMenuItem>
      </TabMenu>
      <Outlet />
    </section>
  );
};

export default Project;
