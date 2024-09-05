import { ReactNode } from 'react';

export interface SelectProviderProps {
  value: string | number | ReactNode;
  type: 'checkbox' | 'select';
  hasSearch?: boolean;
  listLabel?: string;
  isEssential?: boolean;
  isActivated?: boolean;
}
