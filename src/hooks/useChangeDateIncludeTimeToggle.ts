import React, { useEffect, useRef, useState } from 'react';

import convertSharp from '@utils/date/convertSharp';

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
}: useChangeDateIncludeTimeToggleProps) => [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
];

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
    if (startDate && endDate) {
      if (!includeTime) {
        console.log(scheduleRef);
        scheduleRef.current = {
          startDate,
          endDate,
        };
        setStartDate(convertSharp(startDate));
        setEndDate(convertSharp(endDate));
      } else if (scheduleRef.current.startDate && scheduleRef.current.endDate) {
        setStartDate(scheduleRef.current.startDate);
        setEndDate(scheduleRef.current.endDate);
      }
    }
  }, [includeTime]);

  return [includeTime, setIncludeTime];
};

export default useChangeDateIncludeTimeToggle;
