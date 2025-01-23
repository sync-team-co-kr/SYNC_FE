import { Route, Routes } from 'react-router-dom';

import Calendars from '@pages/Calendars';
import Calendar from '@pages/Calendars/Calendar';

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
