type Variant = 'Dday' | 'period' | 'periodB' | 'time';

export interface DayTagProps {
  date: {
    start: Date;
    end: Date;
  };
  variant: Variant;
}
