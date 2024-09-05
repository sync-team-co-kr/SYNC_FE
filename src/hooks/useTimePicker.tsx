import React, { useState } from 'react';

import {
  HOUR_TIME_PICKER_MAX_VALUE,
  MINUTE_TIME_PICKER_MAX_VALUE,
} from '@components/dropdown/TimePickerDropdown/constants';
import setTimePickList from '@components/dropdown/TimePickerDropdown/util';

export interface IPickedTime {
  hour: number | null;
  minute: number | null;
}

interface UseTimePickerReturnType {
  pickedTime: IPickedTime;
  setPickedTime: React.Dispatch<React.SetStateAction<IPickedTime>>;
  hourPickList: number[];
  minutePickList: number[];
  wheelTimePicker: (
    e: React.WheelEvent<HTMLUListElement>,
    type: 'minute' | 'hour',
  ) => void;
}

type useTimePickerType = () => UseTimePickerReturnType;

const useTimePicker: useTimePickerType = () => {
  const [pickedTime, setPickedTime] = useState<IPickedTime>({
    hour: null,
    minute: null,
  });
  const [hourPickList, setHourPickList] = useState([1, 2, 3]);
  const [minutePickList, setMinutePickList] = useState([1, 2, 3]);

  const wheelTimePicker = (
    e: React.WheelEvent<HTMLUListElement>,
    type: 'minute' | 'hour',
  ) => {
    if (type === 'hour')
      return setHourPickList((prevState) =>
        prevState.map((hour) =>
          setTimePickList(hour, e.deltaY > 0, HOUR_TIME_PICKER_MAX_VALUE),
        ),
      );
    return setMinutePickList((prevState) =>
      prevState.map((minute) =>
        setTimePickList(minute, e.deltaY > 0, MINUTE_TIME_PICKER_MAX_VALUE),
      ),
    );
  };
  return {
    wheelTimePicker,
    pickedTime,
    setPickedTime,
    hourPickList,
    minutePickList,
  };
};

export default useTimePicker;
