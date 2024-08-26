import { useRef } from 'react';

import { Calendar } from '@components/Calendar';
import { Tab } from '@components/Tabs/Tab';
import { TabList } from '@components/Tabs/Tab.list';
import { TabPanel, TabPanels } from '@components/Tabs/Tab.panel';
import { Tabs } from '@components/Tabs/Tabs';
import { useModalState } from '@hooks/useModalState';
import { useCalendarActions, useCalendarState } from '@libs/store/task';
import styled from 'styled-components';

const CalenderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
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
