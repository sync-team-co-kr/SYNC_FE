import useTimePicker from '@hooks/useTimePicker';

import { CalendarDropdownWrapper, HourPicker, PickerElement } from './styles';
import { TimePickerDropdownProps } from './types';

const TimePickerDropdown = ({
  isOpen,
  usePickedTimeState,
}: TimePickerDropdownProps) => {
  const { wheelTimePicker, hourPickList, minutePickList } = useTimePicker();
  const { state, setState } = usePickedTimeState;

  return (
    <CalendarDropdownWrapper $isopen={isOpen}>
      <HourPicker onWheel={(e) => wheelTimePicker(e, 'hour')}>
        {hourPickList.map((hour) => (
          <PickerElement
            key={hour}
            onClick={() =>
              setState((prevState) => ({
                ...prevState,
                hour,
              }))
            }
            $hasCurrent={hour === state.hour}
          >
            {hour.toString().padStart(2, '0')}
          </PickerElement>
        ))}
      </HourPicker>
      <HourPicker onWheel={(e) => wheelTimePicker(e, 'minute')}>
        {minutePickList.map((minute) => (
          <PickerElement
            key={minute}
            onClick={() => setState((prevState) => ({ ...prevState, minute }))}
            $hasCurrent={minute === state.minute}
          >
            {minute.toString().padStart(2, '0')}
          </PickerElement>
        ))}
      </HourPicker>
    </CalendarDropdownWrapper>
  );
};

export default TimePickerDropdown;
