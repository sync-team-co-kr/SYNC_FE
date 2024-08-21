import React, { PropsWithChildren, createContext } from 'react';

import type { TaskCalendar, TaskCalendarButton } from './Calendar.types';

interface CalendarProviderProps extends PropsWithChildren {
  type: TaskCalendar;
  value: Date;
  setValue: (button: TaskCalendarButton, type: TaskCalendar) => void;
}

export const CalendarContext = createContext<
  CalendarProviderProps & {
    setValue: (button: TaskCalendarButton, type: TaskCalendar) => void;
  }
>(
  {} as CalendarProviderProps & {
    setValue: (button: TaskCalendarButton, type: TaskCalendar) => void;
  },
);

export const CalendarProvider: React.FC<CalendarProviderProps> = ({
  children,
  ...props
}) => {
  return (
    <CalendarContext.Provider value={props}>
      {children}
    </CalendarContext.Provider>
  );
};
