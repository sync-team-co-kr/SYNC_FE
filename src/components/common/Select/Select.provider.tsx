import { createContext, useContext } from 'react';
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';

import type { SelectProviderProps } from './types';

const SelectContext = createContext<
  SelectProviderProps & {
    onClick: Dispatch<SetStateAction<any>>;
  }
>(
  {} as SelectProviderProps & {
    onClick: Dispatch<SetStateAction<any>>;
  },
);

export const SelectProvider = ({
  children,
  ...props
}: PropsWithChildren<{
  onClick: Dispatch<SetStateAction<any>>;
  isOpen?: boolean;
  options: any[] | undefined;
  type: 'checkbox' | 'select';
  hasSearch?: boolean;
  value: string;
  label?: string;
  listLabel?: string;
  isEssential?: boolean;
}>) => {
  return (
    <SelectContext.Provider value={props}>{children}</SelectContext.Provider>
  );
};

export const useSelectContext = () => {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error('SelectProvider를 찾을 수 없습니다.');
  }

  return context;
};
