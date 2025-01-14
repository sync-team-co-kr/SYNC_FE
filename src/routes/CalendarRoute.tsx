import { Route, Routes } from 'react-router-dom';

import { Calendar } from '@components/Calendar';
import { Calendars } from '@pages/Calendars';

const CalendarRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Calendars />}>
        <Route index element={<Calendar />} />
        <Route path="/day" element={<Calendar />} />
        <Route path="/week" element={<Calendar />} />
        <Route path="/month" element={<Calendar />} />
      </Route>
    </Routes>
  );
};

export default CalendarRoute;
