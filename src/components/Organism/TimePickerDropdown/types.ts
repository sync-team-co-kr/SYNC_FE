import { IPickedTime } from '@hooks/useTimePicker';

export interface TimePickerDropdownProps {
  isOpen: boolean;
  usePickedTimeState: {
    state: IPickedTime;
    setState: React.Dispatch<React.SetStateAction<IPickedTime>>;
  };
}
