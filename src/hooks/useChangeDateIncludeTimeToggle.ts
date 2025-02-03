import { useEffect, useRef, useState } from 'react';

import convertSharp from '@utils/date/convertSharp';
import { isSameDay } from 'date-fns';

interface useChangeDateIncludeTimeToggleProps {
  startDate?: Date;
  endDate?: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}

type useChangeDateIncludeTimeToggleType = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: useChangeDateIncludeTimeToggleProps) => [boolean, () => void];

const useChangeDateIncludeTimeToggle: useChangeDateIncludeTimeToggleType = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const [includeTime, setIncludeTime] = useState(false);
  const scheduleRef = useRef<{ startDate?: Date; endDate?: Date }>({
    startDate: undefined,
    endDate: undefined,
  });

  useEffect(() => {
    setIncludeTime(
      !!startDate?.getHours() ||
        !!startDate?.getMinutes() ||
        !!endDate?.getHours() ||
        !!endDate?.getMinutes(),
    );
  }, []);

  const handleIncludeTimeToggle = () => {
    setIncludeTime((prevState) => !prevState);
    const includeTimeState = !includeTime;
    if (startDate && endDate) {
      // includeTime이 활성화되지 않았을 때
      if (!includeTimeState) {
        console.log(scheduleRef);
        scheduleRef.current = {
          startDate,
          endDate,
        };
        setStartDate(convertSharp(startDate));
        setEndDate(convertSharp(endDate));
      }
      // includeTime이 활성화 되었을 때
      else if (scheduleRef.current.startDate && scheduleRef.current.endDate) {
        if (isSameDay(startDate, scheduleRef.current.startDate)) {
          setStartDate(scheduleRef.current.startDate);
        } else {
          setStartDate(startDate);
        }
        if (isSameDay(startDate, scheduleRef.current.startDate)) {
          setEndDate(scheduleRef.current.endDate);
        } else {
          setEndDate(endDate);
        }
      }
    }
  };

  return [includeTime, handleIncludeTimeToggle];
};

export default useChangeDateIncludeTimeToggle;
