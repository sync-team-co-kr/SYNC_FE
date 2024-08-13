import { useId, useState } from 'react';

/* eslint no-underscore-dangle: 0 */
import { TabProvider } from './Tab.provider';
import type { TabsProps } from './Tabs.types';

export const Tabs = ({ ...props }: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const id = useId();

  return (
    <TabProvider
      activeIndex={props._index ?? activeIndex}
      setActiveIndex={setActiveIndex}
      id={id}
    >
      {props.children}
    </TabProvider>
  );
};
