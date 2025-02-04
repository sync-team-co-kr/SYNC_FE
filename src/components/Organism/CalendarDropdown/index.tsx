import React, { useContext } from 'react';

import { ReactComponent as ArrowLeftIcon } from '@assets/arrow-left.svg';
import { ReactComponent as ArrowRightIcon } from '@assets/arrow-right.svg';
import { CalendarDate } from '@customTypes/calendar';
import useCalendar from '@hooks/useCalendar';
import { WorkUnitScheduleContext } from 'contexts/workUnitScheduleContext';

import CalendarDateItem from './CalendarDateItem';
import { DAY_LIST } from './constants';
import {
  CalendarDateList,
  CalendarDayItem,
  CalendarDropdownContent,
  CalendarDropdownHeader,
  CalendarDropdownWrapper,
} from './styles';
import { CalendarDropdownProps } from './types';

const CalendarDropdown = ({
  isOpen,
  scheduleType,
  selectedDate,
}: CalendarDropdownProps) => {
  const { currentDate, monthlyCalendar, moveMonth, setCalendarDate } =
    useCalendar(selectedDate);
  const { setStartDate, setEndDate } = useContext(WorkUnitScheduleContext);

  const setDate = (date: Date) => {
    if (scheduleType === 'start') setStartDate(date);
    if (scheduleType === 'end') setEndDate(date);
  };

  const handleClickCalendarDateItem = (
    e: React.MouseEvent<HTMLLIElement>,
    calendarDate: CalendarDate,
  ) => {
    e.preventDefault();
    if (calendarDate.isCurrentMonth) {
      setCalendarDate(calendarDate.value);
      setDate(calendarDate.dateType);
    }
  };

  return (
    <CalendarDropdownWrapper $isopen={isOpen}>
      <CalendarDropdownHeader>
        <h2>{`${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`}</h2>
        <div>
          <button onClick={(e) => moveMonth(e, false)}>
            <ArrowLeftIcon />
          </button>
          <button onClick={(e) => moveMonth(e, true)}>
            <ArrowRightIcon />
          </button>
        </div>
      </CalendarDropdownHeader>
      <CalendarDropdownContent>
        <CalendarDateList>
          {DAY_LIST.map((dayItem) => (
            <CalendarDayItem key={dayItem}>{dayItem}</CalendarDayItem>
          ))}
          {monthlyCalendar?.map((calendarDate) => (
            <CalendarDateItem
              key={calendarDate.id}
              calendarDate={calendarDate}
              isCurrentDate={currentDate.getDate() === calendarDate.value}
              onClick={handleClickCalendarDateItem}
            />
          ))}
        </CalendarDateList>
      </CalendarDropdownContent>
    </CalendarDropdownWrapper>
  );
};

export default CalendarDropdown;
