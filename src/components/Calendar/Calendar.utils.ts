import { DayCellContentArg, DayHeaderContentArg } from '@fullcalendar/core';

import { CalenderProps } from './Calendar.types';

export function renderInitialView(type: CalenderProps['type']) {
  switch (type) {
    case 'day':
      return 'timeGridDay';
    case 'week':
      return 'dayGridWeek';
    case 'month':
      return 'dayGridMonth';
    default:
      return 'dayGridMonth';
  }
}

export function renderHeaderToolbar(type: CalenderProps['type']) {
  switch (type) {
    case 'day':
    case 'week':
    case 'month':
    default:
      return {
        start: '',
        right: 'title prev,next addProject filter addSchedule',
      };
  }
}
export const returnDayCellContent = (
  cellInfo: DayCellContentArg,
  type: CalenderProps['type'],
) => {
  if (type === 'month') {
    return cellInfo.date.getDate();
  }
  return null;
};
export const returnDayHeaderContent = (
  cellInfo: DayHeaderContentArg,
  type: CalenderProps['type'],
) => {
  if (type === 'week') {
    return `${cellInfo.date.getDate()} ${cellInfo.date.toLocaleDateString(
      'ko-KR',
      {
        weekday: 'short',
      },
    )}`;
  }
  return cellInfo.date.toLocaleDateString('ko-KR', { weekday: 'short' });
};
