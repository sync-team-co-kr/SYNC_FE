import { ICalendarDay } from '@customTypes/calendar';
import { ITask } from '@customTypes/task';
import { differenceInCalendarDays } from 'date-fns';

const filterTasksWithinMonth = (
  calendarDays: ICalendarDay[],
  tasks?: ITask[],
) => {};

export default filterTasksWithinMonth;
