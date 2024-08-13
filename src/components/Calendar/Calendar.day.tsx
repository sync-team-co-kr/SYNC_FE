import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';

import './style.css';

export const CalendarDay = () => {
  return (
    <FullCalendar
      locale="kr"
      plugins={[dayGridPlugin]}
      initialView="dayGridDay"
    />
  );
};
