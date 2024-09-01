import React from 'react';

import { ReactComponent as TimePickerIcon } from '@assets/input/time.svg';
import TimePickerDropdown from '@components/dropdown/TimePickerDropdown';
import useDropdown from '@hooks/useDropdown';
import { styled } from 'styled-components';

interface InputWithTimePickerProps {
  value?: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  labelText?: string;
  placeholderText: string;
}

const SInputWithTimePicker = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const TimePickerSvg = styled.div`
  width: 18px;
  height: 18px;
  position: absolute;
  right: 21px;
`;

const InputWithTimePicker = ({
  value,
  placeholderText,
}: InputWithTimePickerProps) => {
  const [
    isOpenTimePickerDropdown,
    toggleTimePickerDropdown,
    timePickerDropdownRef,
  ] = useDropdown();
  return (
    <SInputWithTimePicker>
      <input
        type="text"
        value={value?.toString()}
        placeholder={placeholderText}
        readOnly
      />
      <TimePickerSvg ref={timePickerDropdownRef}>
        <TimePickerIcon
          width={18}
          height={18}
          onClick={toggleTimePickerDropdown}
        />
      </TimePickerSvg>
      <TimePickerDropdown isOpen={isOpenTimePickerDropdown} />
    </SInputWithTimePicker>
  );
};

export default InputWithTimePicker;
