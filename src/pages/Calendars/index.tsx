import { useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { ReactComponent as ArrowBottom } from '@assets/arrow-bottom.svg';
import TabMenu from '@components/TabMenu/TabMenu';
import { Button } from '@components/common/Button';
import { ProjectListDropdown } from '@components/dropdown/ProjectListDropdown';
import { useModalState } from '@hooks/useModalState';
import { useBreadCrumbActions } from '@libs/store/breadcrumb/breadcrumb';
import { useTaskState } from '@libs/store/task/task';
import styled from 'styled-components';

import { CALENDAR_TAB_MENU_LIST } from './constants/calendarTabMenuList';

const CalenderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ProjectListDropdownContainer = styled.div`
  display: flex;
  padding: 12px 40px 0 40px;
  width: 100%;
  align-items: flex-start;
  position: relative;
`;

const Calendars = () => {
  // project list dropdown
  const [
    isOpenProjectListDropdown,
    openProjectListDropdown,
    closeProjectListDropdown,
  ] = useModalState();
  const { setMainRoute, setProjectRoute } = useBreadCrumbActions();

  const { project } = useTaskState();

  const projectListDropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setMainRoute('캘린더');
    navigate('/calendars/day');

    return () => {
      setMainRoute('');
      setProjectRoute('');
    };
  }, []);

  return (
    <CalenderContainer>
      <ProjectListDropdownContainer>
        <Button
          variant="text"
          $hasIcon={true}
          $iconPosition="right"
          size="medium"
          text={project.title !== '' ? project.title : '전체보기'}
          onClick={openProjectListDropdown}
          $renderIcon={
            !isOpenProjectListDropdown ? (
              <ArrowBottom />
            ) : (
              <ArrowBottom
                style={{
                  transform: 'rotate(180deg)',
                }}
              />
            )
          }
        />
        <ProjectListDropdown
          isOpen={isOpenProjectListDropdown}
          setClose={closeProjectListDropdown}
          ref={projectListDropdownRef}
        />
      </ProjectListDropdownContainer>
      <TabMenu tabMenuList={CALENDAR_TAB_MENU_LIST} />
      <Outlet />
    </CalenderContainer>
  );
};

export default Calendars;
