import { Calendar } from '@components/Calendar';
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
            <Calendar type="day" />
          </TabPanel>
          <TabPanel>
            <Calendar type="week" />
          </TabPanel>
          <TabPanel>
            <Calendar type="month" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </CalenderContainer>
  );
};
