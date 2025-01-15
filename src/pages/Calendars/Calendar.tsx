import { useLocation } from 'react-router-dom';

import {
  useCalendarActions,
  useCalendarState,
} from '@libs/store/task/calendar';

import { CalendarContent } from './Calendar.content';
import { CalendarHeader } from './Calendar.header';
import { CalendarProvider } from './Calendar.provider';
import { Container } from './styles/Calendar.style';

const Calendar = () => {
  const { currentDate } = useCalendarState();
  const { setCurrentDate } = useCalendarActions();
  const location = useLocation();

  return (
    <CalendarProvider
      type={location.pathname.split('/')[2] as 'day' | 'week' | 'month'}
      value={currentDate}
      setValue={setCurrentDate}
    >
      <Container>
        <CalendarHeader />
        <CalendarContent />
      </Container>
    </CalendarProvider>
  );
};

export default Calendar;
