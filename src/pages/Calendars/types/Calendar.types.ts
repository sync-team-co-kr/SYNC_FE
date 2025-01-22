export type TaskCalendar = 'month' | 'week' | 'day';
export type TaskCalendarButton = 'prev' | 'next';
export interface CalenderProps {
  type: TaskCalendar;
  value: Date;
  setValue: (button: TaskCalendarButton, type: TaskCalendar) => void;
}

export interface TaskData {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  status: number;
  description: string;
}
