import React, { Children, isValidElement } from 'react';

type TabAria = {
  index?: number;
  id: string;
};

export const getTabArias = ({ index, id }: TabAria) => {
  const panelId = `${id}-panel-${index}`;
  const tabId = `${id}-tab-${index}`;

  return {
    tab: {
      id: tabId,
      'aria-controls': panelId,
    },
    panel: {
      id: panelId,
      'aria-labelledby': tabId,
    },
  };
};

export const getValidChildren = (children: React.ReactNode) => {
  return Children.toArray(children).filter((child) =>
    isValidElement(child),
  ) as React.ReactElement[];
};
