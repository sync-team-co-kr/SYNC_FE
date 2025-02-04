import { isBefore } from 'date-fns';

const isStartDateExceedsEndDate = (startDate?: Date, endDate?: Date) => {
  if (!(startDate || endDate)) return false;
  if (startDate && endDate && isBefore(startDate, endDate)) {
    return false;
  }
  return true;
};
export default isStartDateExceedsEndDate;
