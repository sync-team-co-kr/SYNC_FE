import { format } from 'date-fns';

const getFormatDate = (
  scheduleType: 'start' | 'end',
  startDate?: Date,
  endDate?: Date,
) => {
  if (scheduleType === 'start' && startDate)
    return format(startDate, 'yyyy-MM-dd');
  if (scheduleType === 'end' && endDate) return format(endDate, 'yyyy-MM-dd');
  return '';
};

export default getFormatDate;
