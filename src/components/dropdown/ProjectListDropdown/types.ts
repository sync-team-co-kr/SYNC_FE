import { RefObject } from 'react';

export interface ProjectListDropdownProps {
  isOpen: boolean;
  setClose: () => void;
  ref: RefObject<HTMLDivElement>;
}
