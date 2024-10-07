import { ElementType } from 'react';

export interface CalendarTaskDropdownProps {
  isOpen: boolean;
  setClose: () => void;
  as?: ElementType;
}
