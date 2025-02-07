import { IPickedTime } from '@hooks/useTimePicker';

export interface TimePickerDropdownProps {
  isOpen: boolean;
  value: {
    hour: number;
    minute: number;
  };
  onClick: (
    e: React.MouseEvent<HTMLLIElement>,
    type: 'minute' | 'hour',
    value: number,
  ) => void;
}
