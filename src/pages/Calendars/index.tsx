import { CalendarDay } from '@components/Calendar/Calendar.day';
import { CalendarMonth } from '@components/Calendar/Calendar.month';
import { CalendarWeek } from '@components/Calendar/Calendar.week';
import { Tab } from '@components/Tabs/Tab';
import { TabList } from '@components/Tabs/Tab.list';
import { TabPanel, TabPanels } from '@components/Tabs/Tab.panel';
import { Tabs } from '@components/Tabs/Tabs';
import styled from 'styled-components';

const CalenderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Calendars = () => {
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
            <CalendarDay />
          </TabPanel>
          <TabPanel>
            <CalendarWeek />
          </TabPanel>
          <TabPanel>
            <CalendarMonth />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </CalenderContainer>
  );
};
