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

  // 마운트 시 includeTime 토글의 초기 상태 할당
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
    if (!(startDate && endDate)) return;

    // includeTime이 활성화되지 않았을 때
    if (!includeTimeState) {
      scheduleRef.current = {
        startDate,
        endDate,
      };
      setStartDate(convertSharp(startDate));
      setEndDate(convertSharp(endDate));
    }
    // includeTime이 활성화 되었을 때
    else if (scheduleRef.current.startDate && scheduleRef.current.endDate) {
      setStartDate(
        isSameDay(startDate, scheduleRef.current.startDate)
          ? scheduleRef.current.startDate
          : startDate,
      );
      setEndDate(
        isSameDay(endDate, scheduleRef.current.endDate)
          ? scheduleRef.current.endDate
          : endDate,
      );
    }
  };

  return [includeTime, handleIncludeTimeToggle];
};

export default useChangeDateIncludeTimeToggle;
