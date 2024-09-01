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

interface TimePickerDropdownProps {
  isOpen: boolean;
}

const TimePickerDropdown = ({ isOpen }: TimePickerDropdownProps) => {
  const [hours, setHours] = useState([1, 2, 3]);
  const wheelTimePicker = (e: React.WheelEvent<HTMLUListElement>) => {
    if (e.deltaX > 0)
      return setHours((prevState) =>
        prevState.map((hour) => (hour + 1 >= 24 ? 0 : hour + 1)),
      );
    return setHours((prevState) =>
      prevState.map((hour) => (hour - 1 < 0 ? 23 : hour - 1)),
    );
  };

  return (
    <CalendarDropdownWrapper $isopen={isOpen}>
      <HourPicker onWheel={wheelTimePicker}>
        {hours.map((hour) => (
          <li key={hour}>{hour.toString().padStart(0, '2')}</li>
        ))}
      </HourPicker>
      <HourPicker>
        {[58, 59, 60].map((hour) => (
          <li key={hour}>{hour}</li>
        ))}
      </HourPicker>
    </CalendarDropdownWrapper>
  );
};

export default TimePickerDropdown;
