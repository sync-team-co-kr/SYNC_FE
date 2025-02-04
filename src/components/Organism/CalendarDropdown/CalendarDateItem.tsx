import React from 'react';

import { CalendarDate } from '@customTypes/calendar';

import { CalendarDateItemWrapper } from './styles';

interface CalendarDateItemProps {
  calendarDate: CalendarDate;
  isCurrentDate: boolean;
  onClick: (
    e: React.MouseEvent<HTMLLIElement>,
    calendarDate: CalendarDate,
  ) => void;
}

const CalendarDateItem = ({
  calendarDate,
  isCurrentDate,
  onClick,
}: CalendarDateItemProps) => {
  return (
    <CalendarDateItemWrapper
      onClick={(e) => onClick(e, calendarDate)}
      $iscurrentmonth={calendarDate.isCurrentMonth}
      $iscurrentdate={isCurrentDate}
    >
      {String(calendarDate.value)}
    </CalendarDateItemWrapper>
  );
};

export default CalendarDateItem;
