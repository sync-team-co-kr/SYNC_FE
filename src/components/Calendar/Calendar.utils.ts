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
