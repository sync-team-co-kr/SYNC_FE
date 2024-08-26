import { useRef } from 'react';

import { ReactComponent as ArrowBottom } from '@assets/arrow-bottom.svg';
import { Calendar } from '@components/Calendar';
import { Tab } from '@components/Tabs/Tab';
import { TabList } from '@components/Tabs/Tab.list';
import { TabPanel, TabPanels } from '@components/Tabs/Tab.panel';
import { Tabs } from '@components/Tabs/Tabs';
import { Button } from '@components/common/Button';
import { ProjectListDropdown } from '@components/dropdown/ProjectListDropdown';
import { useModalState } from '@hooks/useModalState';
import { useCalendarActions, useCalendarState } from '@libs/store/task';
import styled from 'styled-components';

const CalenderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: flex-start;
`;

export const Calendars = () => {
  // project list dropdown
  const [
    isOpenProjectListDropdown,
    openProjectListDropdown,
    closeProjectListDropdown,
  ] = useModalState();

  const { currentDate } = useCalendarState();
  const { setCurrentDate } = useCalendarActions();

  const projectListDropdownRef = useRef(null);

  return (
    <CalenderContainer>
      <Button
        variant="text"
        hasIcon={true}
        size="medium"
        text="전체보기"
        renderIcon={<ArrowBottom />}
        onClick={openProjectListDropdown}
      />
      <ProjectListDropdown
        isOpen={isOpenProjectListDropdown}
        setClose={closeProjectListDropdown}
        ref={projectListDropdownRef}
      />
      <Tabs>
        <TabList>
          <Tab>일</Tab>
          <Tab>주</Tab>
          <Tab>월</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Calendar
              type="day"
              value={currentDate}
              setValue={setCurrentDate}
            />
          </TabPanel>
          <TabPanel>
            <Calendar
              type="week"
              value={currentDate}
              setValue={setCurrentDate}
            />
          </TabPanel>
          <TabPanel>
            <Calendar
              value={currentDate}
              setValue={setCurrentDate}
              type="month"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </CalenderContainer>
  );
};
