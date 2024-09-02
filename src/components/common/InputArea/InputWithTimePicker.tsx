import React, { useEffect, useState } from 'react';

import { ReactComponent as TimePickerIcon } from '@assets/input/time.svg';
import TimePickerDropdown from '@components/dropdown/TimePickerDropdown';
import useDropdown from '@hooks/useDropdown';
import { ProjectPeriodTime } from '@pages/projects/ProjectBoards/CreateProjectModal/CreateProjectModal';
import { styled } from 'styled-components';

interface InputWithTimePickerProps {
  value: ProjectPeriodTime;
  setValue: React.Dispatch<React.SetStateAction<ProjectPeriodTime>>;
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
  setValue,
  placeholderText,
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
    <SInputWithTimePicker>
      <input
        type="text"
        value={
          value.hour && value.minute
            ? `${value.hour.toString().padStart(2, '0')} : ${value.minute.toString().padStart(2, '0')}`
            : ''
        }
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
