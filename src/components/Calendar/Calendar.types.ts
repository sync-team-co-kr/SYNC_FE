export interface CalenderProps {
  type: 'day' | 'week' | 'month';
  value: Date;
  setValue: (button: 'prev' | 'next') => void;
}
