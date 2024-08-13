import { useId, useState } from 'react';

/* eslint no-underscore-dangle: 0 */
import { TabProvider } from './Tab.provider';
import type { TabsProps } from './Tabs.types';

export const Tabs = ({ startIndex = 0, ...props }: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(startIndex);

  const id = useId();

  return (
    <TabProvider
      activeIndex={props.index ?? activeIndex}
      setActiveIndex={setActiveIndex}
      id={id}
    >
      {props.children}
    </TabProvider>
  );
};
