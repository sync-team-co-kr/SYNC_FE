import React from 'react';
import type { CSSProperties } from 'react';

import styled from 'styled-components';

type ColumnProps = {
  children: React.ReactNode;
} & CSSProperties;

const Flex = Object.assign(styled.div`
  display: flex;
  flex-direction: column;
`);

export const Column = ({ children, ...props }: ColumnProps) => {
  return <Flex {...props}>{children}</Flex>;
};
