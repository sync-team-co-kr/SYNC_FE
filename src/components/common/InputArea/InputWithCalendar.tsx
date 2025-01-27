import { useContext } from 'react';

import { ReactComponent as CalendarIcon } from '@assets/calendar.svg';
import CalendarDropdown from '@components/dropdown/CalendarDropdown';
import useDropdown from '@hooks/useDropdown';
import { getFormatDate } from '@utils/workUnit';
import { WorkUnitScheduleContext } from 'contexts/workUnitScheduleContext';

import { CalendarSVG, SInputWithCalendar } from './InputArea.style';

interface InputWithCalendarAreaProps {
  scheduleType: 'start' | 'end';
  placeholderText: string;
}

const InputWithCalendarArea = ({
  scheduleType,
  placeholderText,
}: InputWithCalendarAreaProps) => {
  const [isOpenCalendarDropdown, toggleCalendarDropdown, calendarDropdownRef] =
    useDropdown();
  const { startDate, endDate } = useContext(WorkUnitScheduleContext);

  return (
    <SInputWithCalendar>
      <input
        type="text"
        value={getFormatDate(scheduleType, startDate, endDate)}
        placeholder={placeholderText}
        readOnly
      />
      <CalendarSVG ref={calendarDropdownRef}>
        <CalendarIcon width="18" height="18" onClick={toggleCalendarDropdown} />
        <CalendarDropdown
          isOpen={isOpenCalendarDropdown}
          scheduleType={scheduleType}
        />
      </CalendarSVG>
    </SInputWithCalendar>
  );
};

export default InputWithCalendarArea;
