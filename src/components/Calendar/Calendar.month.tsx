import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';

export const CalendarMonth = () => {
  return (
    <FullCalendar
      locale="kr"
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
    />
  );
};
