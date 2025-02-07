import { useContext } from 'react';

import { ReactComponent as TimePickerIcon } from '@assets/input/time.svg';
import TimePickerDropdown from '@components/Organism/TimePickerDropdown';
import useDropdown from '@hooks/useDropdown';
import useTimePicker from '@hooks/useTimePicker';
import { getFormatTime } from '@utils/workUnit';
import { WorkUnitScheduleContext } from 'contexts/workUnitScheduleContext';
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
  const [
    isOpenTimePickerDropdown,
    toggleTimePickerDropdown,
    timePickerDropdownRef,
  ] = useDropdown();
  const { startDate, endDate } = useContext(WorkUnitScheduleContext);
  const { pickedTime, handleClickTimePickerElement } = useTimePicker(
    scheduleType,
    scheduleType === 'start' ? startDate : endDate,
  );

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
        value={pickedTime}
        onClick={handleClickTimePickerElement}
      />
    </SInputWithTimePicker>
  );
};

export default InputWithTimePicker;
