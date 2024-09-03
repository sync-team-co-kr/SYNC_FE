import React, { useEffect, useState } from 'react';

import { ReactComponent as TimePickerIcon } from '@assets/input/time.svg';
import TimePickerDropdown from '@components/dropdown/TimePickerDropdown';
import useDropdown from '@hooks/useDropdown';
import { ProjectPeriodTime } from '@pages/projects/ProjectBoards/CreateProjectModal/CreateProjectModal';
import { styled } from 'styled-components';
import { vars } from 'token';

interface InputWithTimePickerProps {
  value: ProjectPeriodTime;
  setValue: React.Dispatch<React.SetStateAction<ProjectPeriodTime>>;
  labelText?: string;
  placeholderText: string;
  isDisabled: boolean;
}

const SInputWithTimePicker = styled.div<{ $isdisabled: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  input {
    background-color: ${(props) =>
      props.$isdisabled
        ? vars.sementic.color.black10
        : vars.sementic.color.white};
  }
`;

const TimePickerSvg = styled.div`
  width: 18px;
  height: 18px;
  position: absolute;
  right: 21px;
`;

const InputWithTimePicker = ({
  value,
  setValue,
  placeholderText,
  isDisabled,
}: InputWithTimePickerProps) => {
  const [hour, setHour] = useState<number | null>(null);
  const [minute, setMinute] = useState<number | null>(null);
  const [
    isOpenTimePickerDropdown,
    toggleTimePickerDropdown,
    timePickerDropdownRef,
  ] = useDropdown();

  useEffect(() => {
    setValue({
      hour,
      minute,
    });
  }, [hour, minute]);

  return (
    <SInputWithTimePicker $isdisabled={isDisabled}>
      <input
        type="text"
        value={
          value.hour && value.minute
            ? `${value.hour.toString().padStart(2, '0')} : ${value.minute.toString().padStart(2, '0')}`
            : ''
        }
        placeholder={placeholderText}
        readOnly
        disabled={isDisabled}
      />
      <TimePickerSvg ref={timePickerDropdownRef}>
        <TimePickerIcon
          width={18}
          height={18}
          onClick={!isDisabled ? toggleTimePickerDropdown : undefined}
        />
      </TimePickerSvg>
      <TimePickerDropdown
        isOpen={isOpenTimePickerDropdown}
        currentHour={hour}
        setHour={setHour}
        currentMinute={minute}
        setMinute={setMinute}
      />
    </SInputWithTimePicker>
  );
};

export default InputWithTimePicker;
