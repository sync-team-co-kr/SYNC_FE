import type { PropsWithChildren } from 'react';

interface TabsBaseProps extends PropsWithChildren<{}> {
  // 최초 활성화 탭 인덱스
  startIndex?: number;

  onChange?: (index: number) => void;
  index?: number;
  fullWidth?: boolean;
}

export type DefaultTabProps = TabsBaseProps;

export type TabListProps = PropsWithChildren & {
  padding?: string;
};

type TabBaseProps = {
  _index?: number;
  _onClick?: () => void;
  text?: string;
  disabled?: boolean;
};

export type TabsProps = TabsBaseProps & PropsWithChildren;
export type TabProps = TabBaseProps & PropsWithChildren;

export type TabPanelsProps = PropsWithChildren;

export type TabPanelProps = PropsWithChildren & {
  render?: boolean;
  _index?: number;
  padding?: string;
};
