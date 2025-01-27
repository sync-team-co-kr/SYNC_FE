import { useState } from 'react';

import InputWithCalendarArea from '@components/common/InputArea/InputWithCalendar';
import InputWithTimePicker from '@components/common/InputArea/InputWithTimePicker';
import Label from '@components/common/Label';
import Toggle from '@components/common/Toggle/Toggle';
import { WorkUnitScheduleProvider } from 'contexts/workUnitScheduleContext';

import { CrossDash, ScheduleRegistrationWrapper, ToggleArea } from './style';

interface ScheduleRegistFormProps {
  startDate?: Date;
  endDate?: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}

const ScheduleRegistForm = (props: ScheduleRegistFormProps) => {
  const [includeTime, setIncludeTime] = useState(false);

  return (
    <WorkUnitScheduleProvider {...props}>
      <ToggleArea>
        <Label text="일정" id="schedule" isRequired={false} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>시간 포함</span>
          <Toggle
            isActive={includeTime}
            toggleSwtich={() => setIncludeTime((prevState) => !prevState)}
          />
        </div>
      </ToggleArea>

      <ScheduleRegistrationWrapper>
        <InputWithCalendarArea
          scheduleType="start"
          placeholderText="프로젝트 시작 날짜"
        />

        <CrossDash></CrossDash>
        <InputWithCalendarArea
          scheduleType="end"
          placeholderText="프로젝트 종료 날짜"
        />
      </ScheduleRegistrationWrapper>

      <ScheduleRegistrationWrapper>
        <InputWithTimePicker
          scheduleType="start"
          placeholderText="프로젝트 시작 시간"
          isDisabled={!includeTime}
        />
        <CrossDash></CrossDash>
        <InputWithTimePicker
          scheduleType="end"
          placeholderText="프로젝트 시작 시간"
          isDisabled={!includeTime}
        />
      </ScheduleRegistrationWrapper>
    </WorkUnitScheduleProvider>
  );
};

export default ScheduleRegistForm;
