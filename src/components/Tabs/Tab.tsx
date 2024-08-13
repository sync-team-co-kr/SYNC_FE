import { useEffect, useRef } from 'react';

import { useTabContext } from './Tab.provider';
import { TabElement } from './Tabs.style';

/* eslint no-underscore-dangle: 0 */
import { TabsProps } from './Tabs.types';
import { getTabArias } from './Tabs.utils';

export const Tab = (props: TabsProps) => {
  const tabContext = useTabContext();
  const tabRef = useRef<HTMLDivElement>(null);
  const attributes = getTabArias({
    index: props._index,
    id: tabContext.id,
  });

  const isActive = tabContext.activeIndex === props._index;

  useEffect(() => {
    if (isActive && tabRef.current) {
      tabRef.current.focus();
    }
  }, [isActive]);

  return (
    <TabElement
      ref={tabRef}
      onClick={props._onClick}
      role="tab"
      tabIndex={-1}
      aria-selected={isActive}
      aria-aria-disabled={props.disabled}
      data-selected={isActive}
      {...attributes.tab}
    >
      {props.children}
    </TabElement>
  );
};
