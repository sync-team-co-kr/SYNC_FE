import { ReactNode, createContext, useContext } from 'react';
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';

import type { SelectProviderProps } from './types';

const SelectContext = createContext<
  SelectProviderProps & {
    setToggleOpen: Dispatch<SetStateAction<boolean>>;
  }
>(
  {} as SelectProviderProps & {
    setToggleOpen: Dispatch<SetStateAction<boolean>>;
  },
);

export const SelectProvider = ({
  children,
  ...props
}: PropsWithChildren<{
  value: string | number | ReactNode;
  type: 'checkbox' | 'select';
  hasSearch?: boolean;
  isOpen?: boolean;
  listLabel?: string;
  isEssential?: boolean;
  isActivated?: boolean;
  setToggleOpen: Dispatch<SetStateAction<boolean>>;
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
