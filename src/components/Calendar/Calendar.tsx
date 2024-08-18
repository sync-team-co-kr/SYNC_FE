import { CalendarDay } from './Calendar.day';
import { CalendarHeader } from './Calendar.header';
import { CalendarMonth } from './Calendar.month';
import { Container } from './Calendar.style';
import { CalenderProps } from './Calendar.types';
import { CalendarWeek } from './Calendar.week';

export const Calendar = ({ type }: CalenderProps) => {
  return (
    <Container>
      <CalendarHeader />
      {type === 'day' && <CalendarDay />}
      {type === 'week' && <CalendarWeek />}
      {type === 'month' && <CalendarMonth />}
    </Container>
  );
};
