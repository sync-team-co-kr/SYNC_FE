import React from 'react';

import CalendarIcon from '@assets/calendar.svg';
import CalendarDropdown from '@components/dropdown/CalendarDropdown';
import useDropdown from '@hooks/useDropdown';
import { format } from 'date-fns';

import StyleCreateProjectModal from './CreateProjectModal.style';

interface InputWithCalendarProps {
  date?: Date;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const InputWithCalendar = ({ date, setDate }: InputWithCalendarProps) => {
  const [isOpenCalendarDropdown, toggleCalendarDropdown, calendarDropdownRef] =
    useDropdown();
  return (
    <StyleCreateProjectModal.InputWithCaelndar>
      <input
        type="text"
        value={date ? format(date, 'yyyy-MM-dd') : ''}
        placeholder="프로젝트 시작일"
        readOnly
      ></input>
      <StyleCreateProjectModal.CalendarSVGCover>
        <StyleCreateProjectModal.ActiveButton ref={calendarDropdownRef}>
          <img
            src={CalendarIcon}
            alt="달력 아이콘"
            onClick={toggleCalendarDropdown}
          />
          <CalendarDropdown isOpen={isOpenCalendarDropdown} setDate={setDate} />
        </StyleCreateProjectModal.ActiveButton>
      </StyleCreateProjectModal.CalendarSVGCover>
    </StyleCreateProjectModal.InputWithCaelndar>
  );
};

export default InputWithCalendar;
