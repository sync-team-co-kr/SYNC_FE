import { Route, Routes } from 'react-router-dom';

import { CalendarDay } from '@components/Calendar/Calendar.day';
import { CalendarMonth } from '@components/Calendar/Calendar.month';
import { CalendarWeek } from '@components/Calendar/Calendar.week';
import { Calendars } from '@pages/Calendars';

const CalendarRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Calendars />}>
        <Route index element={<CalendarDay />} />
        <Route path="/day/:id" element={<CalendarDay />} />
        <Route path="/week/:id" element={<CalendarWeek />} />
        <Route path="/month/:id" element={<CalendarMonth />} />
      </Route>
    </Routes>
  );
};

export default CalendarRoute;
