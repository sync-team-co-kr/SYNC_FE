import React from 'react';

import { ReactComponent as CalendarIcon } from '@assets/calendar.svg';
import CalendarDropdown from '@components/dropdown/CalendarDropdown';
import useDropdown from '@hooks/useDropdown';
import { format } from 'date-fns';

import { CalendarSVG, SInputWithCalendar } from './InputArea.style';

interface InputWithCalendarAreaProps {
  value?: Date;
  setDate: (date: Date) => void;
  labelText?: string;
  placeholderText: string;
}

const InputWithCalendarArea = ({
  value,
  setDate,
  placeholderText,
}: InputWithCalendarAreaProps) => {
  const [isOpenCalendarDropdown, toggleCalendarDropdown, calendarDropdownRef] =
    useDropdown();
  return (
    <SInputWithCalendar>
      <input
        type="text"
        value={value ? format(value, 'yyyy-MM-dd') : ''}
        placeholder={placeholderText}
        readOnly
      />
      <CalendarSVG ref={calendarDropdownRef}>
        <CalendarIcon width="18" height="18" onClick={toggleCalendarDropdown} />
        <CalendarDropdown isOpen={isOpenCalendarDropdown} setDate={setDate} />
      </CalendarSVG>
    </SInputWithCalendar>
  );
};

export default InputWithCalendarArea;
