import React from 'react';

import useTimePicker, { IPickedTime } from '@hooks/useTimePicker';
import { styled } from 'styled-components';
import { vars } from 'token';

const CalendarDropdownWrapper = styled.section<{ $isopen: boolean }>`
  padding: 10px 32px;
  background-color: ${vars.sementic.color.white};
  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.05);
  display: ${(props) => (props.$isopen ? 'flex' : 'none')};
  gap: 30px;
  position: absolute;
  bottom: -128px;
  z-index: 50;
`;

const HourPicker = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  li {
    cursor: pointer;
  }
`;

const PickerElement = styled.li<{ $hasCurrent: boolean }>`
  color: ${(props) =>
    props.$hasCurrent
      ? vars.sementic.color.black
      : vars.sementic.color.black20};
`;

interface TimePickerDropdownProps {
  isOpen: boolean;
  usePickedTimeState: {
    state: IPickedTime;
    setState: React.Dispatch<React.SetStateAction<IPickedTime>>;
  };
}

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
