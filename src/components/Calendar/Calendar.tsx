import { CalendarContent } from './Calendar.content';
import { CalendarHeader } from './Calendar.header';
import { CalendarProvider } from './Calendar.provider';
import { Container } from './Calendar.style';
import { CalenderProps } from './Calendar.types';

export const Calendar = ({ type, value, setValue }: CalenderProps) => {
  return (
    <CalendarProvider type={type} value={value} setValue={setValue}>
      <Container>
        <CalendarHeader />
        <CalendarContent />
      </Container>
    </CalendarProvider>
  );
};
