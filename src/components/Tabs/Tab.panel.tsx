import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import { cloneElement, forwardRef, useRef } from 'react';
import React from 'react';

import { useTabContext } from './Tab.provider';
import type { TabPanelProps, TabPanelsProps } from './Tabs.types';
import { getTabArias, getValidChildren } from './Tabs.utils';

export const TabPanels = (props: TabPanelsProps) => {
  const renderTabPanels = () => {
    getValidChildren(props.children).map((child, index) => {
      cloneElement(child, {
        key: index,
        _index: index,
      });
    });
  };
  return <>{renderTabPanels()}</>;
};

type TabPanelComponent = <T extends ElementType>(
  props: TabPanelProps & {
    ref?: ComponentPropsWithRef<T>['ref'];
  },
) => JSX.Element | ReactNode | null;

export const TabPanel: TabPanelComponent = forwardRef(function TabPanel<
  T extends ElementType,
>(props: TabPanelProps, ref: ComponentPropsWithRef<T>['ref']) {
  const isFirstOpen = useRef(true);
  const Element = 'div';
  const tabContext = useTabContext();

  const attributes = getTabArias({
    index: props._index,
    id: tabContext.id,
  });

  if (!tabContext) return null;

  const isActive = tabContext.activeIndex === props._index;
  const shouldRender =
    isActive || props.render || isFirstOpen.current === false;

  if (isActive && isFirstOpen.current) isFirstOpen.current = false;

  return (
    <Element
      role="tabpanel"
      tabIndex={0}
      ref={ref}
      {...attributes.panel}
      {...(!isActive && { hidden: true })}
    >
      {shouldRender ? props.children : null}
    </Element>
  );
});
