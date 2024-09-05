import { cloneElement } from 'react';

import { useTabContext } from './Tab.provider';
import { TabListElement } from './Tabs.style';
import { TabListProps } from './Tabs.types';
import { getValidChildren } from './Tabs.utils';

export const TabList = ({ children, padding }: TabListProps) => {
  const tabContext = useTabContext();

  const renderTabs = () =>
    getValidChildren(children).map((child, index) => {
      return cloneElement(child, {
        key: index,
        _onClick: () => {
          tabContext.setActiveIndex(index);
        },
        _index: index,
      });
    });

  return <TabListElement padding={padding}>{renderTabs()}</TabListElement>;
};
