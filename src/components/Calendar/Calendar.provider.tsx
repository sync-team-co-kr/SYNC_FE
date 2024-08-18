import React, { PropsWithChildren, createContext } from 'react';

interface CalendarProviderProps extends PropsWithChildren {
  type: 'day' | 'week' | 'month';
  value: Date;
  setValue: (button: 'prev' | 'next') => void;
}

export const CalendarContext = createContext<
  CalendarProviderProps & {
    setValue: (button: 'prev' | 'next') => void;
  }
>(
  {} as CalendarProviderProps & { setValue: (button: 'prev' | 'next') => void },
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
