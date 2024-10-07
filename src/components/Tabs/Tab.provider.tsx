import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { createContext, useContext } from 'react';

import type { TabsProps } from './Tabs.types';

const TabIndexContext = createContext<
  TabsProps & {
    setActiveIndex: Dispatch<SetStateAction<number>>;
    activeIndex: number;
    id: string;
  }
>(
  {} as TabsProps & {
    setActiveIndex: Dispatch<SetStateAction<number>>;
    activeIndex: number;
    id: string;
  },
);

export const TabProvider = ({
  children,
  ...props
}: PropsWithChildren<{
  setActiveIndex: Dispatch<SetStateAction<number>>;
  activeIndex: number;
  id: string;
}>) => {
  return (
    <TabIndexContext.Provider value={props}>
      {children}
    </TabIndexContext.Provider>
  );
};

export const useTabContext = () => {
  const context = useContext(TabIndexContext);

  if (!context) {
    throw new Error('TabProvider를 찾을 수 없습니다.');
  }

  return context;
};
