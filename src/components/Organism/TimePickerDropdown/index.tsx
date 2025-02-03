import useTimePicker from '@hooks/useTimePicker';

import { CalendarDropdownWrapper, HourPicker, PickerElement } from './styles';
import { TimePickerDropdownProps } from './types';

const TimePickerDropdown = ({
  isOpen,
  value,
  onClick,
}: TimePickerDropdownProps) => {
  const { wheelTimePicker, hourPickList, minutePickList } = useTimePicker();

  return (
    <CalendarDropdownWrapper $isopen={isOpen}>
      <HourPicker onWheel={(e) => wheelTimePicker(e, 'hour')}>
        {hourPickList.map((hour) => (
          <PickerElement
            key={hour}
            onClick={(e) => onClick(e, 'hour', hour)}
            $hasCurrent={hour === value.hour}
          >
            {hour.toString().padStart(2, '0')}
          </PickerElement>
        ))}
      </HourPicker>
      <HourPicker onWheel={(e) => wheelTimePicker(e, 'minute')}>
        {minutePickList.map((minute) => (
          <PickerElement
            key={minute}
            onClick={(e) => onClick(e, 'minute', minute)}
            $hasCurrent={minute === value.minute}
          >
            {minute.toString().padStart(2, '0')}
          </PickerElement>
        ))}
      </HourPicker>
    </CalendarDropdownWrapper>
  );
};

export default TimePickerDropdown;
