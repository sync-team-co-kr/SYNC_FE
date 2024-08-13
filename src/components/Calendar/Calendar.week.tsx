import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';

import './style.css';

export const CalendarWeek = () => {
  return (
    <FullCalendar
      locale="kr"
      plugins={[dayGridPlugin]}
      initialView="dayGridWeek"
    />
  );
};
