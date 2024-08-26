import { ElementType } from 'react';

export type FilterDropdownProps = {
  isOpen: boolean;
  setClose: () => void;
};

export interface CalendarFilterDropdownProps extends FilterDropdownProps {
  as?: ElementType;
}
