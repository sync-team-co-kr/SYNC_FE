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
import {
  useCalendarActions,
  useCalendarState,
} from '@libs/store/task/calendar';
import styled from 'styled-components';

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
      <ProjectListDropdownContainer>
        <Button
          variant="text"
          hasIcon={true}
          iconPosition="right"
          size="medium"
          text="전체보기"
          onClick={openProjectListDropdown}
          renderIcon={
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
