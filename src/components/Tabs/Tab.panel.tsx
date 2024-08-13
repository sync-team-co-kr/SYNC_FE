/* eslint no-underscore-dangle: 0 */
import type { ComponentPropsWithRef, ElementType } from 'react';
import { cloneElement, forwardRef, useRef } from 'react';

import { useTabContext } from './Tab.provider';
import { TabPanelElement } from './Tabs.style';
import type { TabPanelProps, TabPanelsProps } from './Tabs.types';
import { getTabArias, getValidChildren } from './Tabs.utils';

export const TabPanels = (props: TabPanelsProps) => {
  const renderTabPanels = () => {
    return getValidChildren(props.children).map((child, index) => {
      return cloneElement(child, {
        key: index,
        _index: index,
      });
    });
  };
  return <>{renderTabPanels()}</>;
};

type TabPanelComponent = <E extends ElementType>(
  props: TabPanelProps & {
    ref?: ComponentPropsWithRef<E>['ref'];
  },
) => JSX.Element | null;

export const TabPanel: TabPanelComponent = forwardRef(function TabPanel<
  E extends ElementType,
>(props: TabPanelProps, ref: ComponentPropsWithRef<E>['ref']) {
  const isFirstOpen = useRef(true);
  const Element = TabPanelElement;
  const tabContext = useTabContext();

  const attributes = getTabArias({
    index: props._index,
    id: tabContext.id,
  });

  if (!tabContext) {
    return null;
  }

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
