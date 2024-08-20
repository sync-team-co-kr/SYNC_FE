export interface CalenderProps {
  type: 'day' | 'week' | 'month';
  value: Date;
  setValue: (button: 'prev' | 'next') => void;
}

export interface TaskData {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  status: number;
  description: string;
}
