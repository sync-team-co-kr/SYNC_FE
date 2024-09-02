import React, { useState } from 'react';

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
  currentHour: number | null;
  setHour: React.Dispatch<React.SetStateAction<number | null>>;
  currentMinute: number | null;
  setMinute: React.Dispatch<React.SetStateAction<number | null>>;
}

const TimePickerDropdown = ({
  isOpen,
  currentHour,
  setHour,
  currentMinute,
  setMinute,
}: TimePickerDropdownProps) => {
  const [hours, setHours] = useState([1, 2, 3]);
  const [minutes, setMinutes] = useState([1, 2, 3]);

  const wheelTimePicker = (
    e: React.WheelEvent<HTMLUListElement>,
    maxValue: number,
  ) => {
    if (e.deltaY > 0)
      return setHours((prevState) =>
        prevState.map((hour) => (hour + 1 > maxValue ? 0 : hour + 1)),
      );
    return setHours((prevState) =>
      prevState.map((hour) => (hour - 1 < 0 ? maxValue : hour - 1)),
    );
  };

  const wheelMinutesPicker = (
    e: React.WheelEvent<HTMLUListElement>,
    maxValue: number,
  ) => {
    if (e.deltaY > 0)
      return setMinutes((prevState) =>
        prevState.map((hour) => (hour + 1 > maxValue ? 0 : hour + 1)),
      );
    return setMinutes((prevState) =>
      prevState.map((hour) => (hour - 1 < 0 ? maxValue : hour - 1)),
    );
  };

  return (
    <CalendarDropdownWrapper $isopen={isOpen}>
      <HourPicker onWheel={(e) => wheelTimePicker(e, 23)}>
        {hours.map((hour) => (
          <PickerElement
            key={hour}
            onClick={() => setHour(hour)}
            $hasCurrent={hour === currentHour}
          >
            {hour.toString().padStart(2, '0')}
          </PickerElement>
        ))}
      </HourPicker>
      <HourPicker onWheel={(e) => wheelMinutesPicker(e, 59)}>
        {minutes.map((minute) => (
          <PickerElement
            key={minute}
            onClick={() => setMinute(minute)}
            $hasCurrent={minute === currentMinute}
          >
            {minute.toString().padStart(2, '0')}
          </PickerElement>
        ))}
      </HourPicker>
    </CalendarDropdownWrapper>
  );
};

export default TimePickerDropdown;
