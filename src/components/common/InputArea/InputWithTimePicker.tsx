import React, { useContext, useEffect } from 'react';

import { ReactComponent as TimePickerIcon } from '@assets/input/time.svg';
import TimePickerDropdown from '@components/dropdown/TimePickerDropdown';
import useDropdown from '@hooks/useDropdown';
import useTimePicker from '@hooks/useTimePicker';
import { getFormatTime } from '@utils/workUnit';
import { WorkUnitScheduleContext } from 'contexts/workUnitScheduleContext';
import { setHours, setMinutes } from 'date-fns';
import { styled } from 'styled-components';
import { vars } from 'token';

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

interface InputWithTimePickerProps {
  scheduleType: 'start' | 'end';
  labelText?: string;
  placeholderText: string;
  isDisabled: boolean;
}

const InputWithTimePicker = ({
  scheduleType,
  placeholderText,
  isDisabled,
}: InputWithTimePickerProps) => {
  const { pickedTime, setPickedTime } = useTimePicker();
  const [
    isOpenTimePickerDropdown,
    toggleTimePickerDropdown,
    timePickerDropdownRef,
  ] = useDropdown();
  const { startDate, endDate, setStartDate, setEndDate } = useContext(
    WorkUnitScheduleContext,
  );

  useEffect(() => {
    const { hour, minute } = pickedTime;
    if (scheduleType === 'start' && startDate) {
      setStartDate(setMinutes(setHours(startDate, hour), minute));
    }
    if (scheduleType === 'end' && endDate) {
      setEndDate(setMinutes(setHours(endDate, hour), minute));
    }
  }, [pickedTime.hour, pickedTime.minute]);

  return (
    <SInputWithTimePicker $isdisabled={isDisabled}>
      <input
        type="text"
        value={getFormatTime(scheduleType, startDate, endDate)}
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
        usePickedTimeState={{
          state: pickedTime,
          setState: setPickedTime,
        }}
      />
    </SInputWithTimePicker>
  );
};

export default InputWithTimePicker;
