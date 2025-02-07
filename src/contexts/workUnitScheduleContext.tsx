import React, { PropsWithChildren, createContext } from 'react';

interface WorkUnitScheduleProviderProps extends PropsWithChildren {
  startDate?: Date;
  endDate?: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}

export const WorkUnitScheduleContext = createContext(
  {} as WorkUnitScheduleProviderProps,
);

export const WorkUnitScheduleProvider: React.FC<
  WorkUnitScheduleProviderProps
> = ({ children, ...props }: WorkUnitScheduleProviderProps) => {
  return (
    <WorkUnitScheduleContext.Provider value={props}>
      {children}
    </WorkUnitScheduleContext.Provider>
  );
};
