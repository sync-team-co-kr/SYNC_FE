import { Tab } from '@components/Tabs/Tab';
import { TabList } from '@components/Tabs/Tab.list';
import { Tabs } from '@components/Tabs/Tabs';

export const Calendars = () => {
  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>일</Tab>
          <Tab>주</Tab>
          <Tab>월</Tab>
        </TabList>
      </Tabs>
    </div>
  );
};
