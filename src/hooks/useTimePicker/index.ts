import React, { useContext, useState } from 'react';

import {
  HOUR_TIME_PICKER_MAX_VALUE,
  MINUTE_TIME_PICKER_MAX_VALUE,
} from '@components/Organism/TimePickerDropdown/constants';
import setTimePickList from '@components/Organism/TimePickerDropdown/util';
import { WorkUnitScheduleContext } from 'contexts/workUnitScheduleContext';
import { setHours, setMinutes } from 'date-fns';

export interface IPickedTime {
  hour: number;
  minute: number;
}

interface UseTimePickerReturnType {
  pickedTime: IPickedTime;
  handleClickTimePickerElement: (
    e: React.MouseEvent<HTMLLIElement>,
    type: 'minute' | 'hour',
    value: number,
  ) => void;
  hourPickList: number[];
  minutePickList: number[];
  wheelTimePicker: (
    e: React.WheelEvent<HTMLUListElement>,
    type: 'minute' | 'hour',
  ) => void;
}

type useTimePickerType = (
  scheduleType?: 'start' | 'end',
  date?: Date,
) => UseTimePickerReturnType;

const useTimePicker: useTimePickerType = (scheduleType, date) => {
  const [pickedTime, setPickedTime] = useState<IPickedTime>({
    hour: date?.getHours() || 0,
    minute: date?.getMinutes() || 0,
  });
  const [hourPickList, setHourPickList] = useState([1, 2, 3]);
  const [minutePickList, setMinutePickList] = useState([1, 2, 3]);
  const { setStartDate, setEndDate } = useContext(WorkUnitScheduleContext);

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

  const handleClickTimePickerElement = (
    e: React.MouseEvent<HTMLLIElement>,
    type: 'minute' | 'hour',
    value: number,
  ) => {
    e.preventDefault();
    if (date) {
      if (scheduleType === 'start') {
        if (type === 'hour') {
          setStartDate(setHours(date, value));
          setPickedTime((prevState) => ({
            ...prevState,
            hour: value,
          }));
        } else if (type === 'minute') {
          setStartDate(setMinutes(date, value));
          setPickedTime((prevState) => ({
            ...prevState,
            minute: value,
          }));
        }
      }
      if (scheduleType === 'end') {
        if (type === 'hour') {
          setEndDate(setHours(date, value));
          setPickedTime((prevState) => ({
            ...prevState,
            hour: value,
          }));
        } else if (type === 'minute') {
          setEndDate(setMinutes(date, value));
          setPickedTime((prevState) => ({
            ...prevState,
            minute: value,
          }));
        }
      }
    }
  };

  return {
    wheelTimePicker,
    pickedTime,
    handleClickTimePickerElement,
    hourPickList,
    minutePickList,
  };
};

export default useTimePicker;
