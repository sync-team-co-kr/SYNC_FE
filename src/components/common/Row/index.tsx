import React, { forwardRef } from 'react';
import type { CSSProperties } from 'react';

import styled from 'styled-components';

type RowProps = {
  children: React.ReactNode;
} & CSSProperties;

const Flex = Object.assign(styled.div`
  display: flex;
  flex-direction: row;
`);

export const Row = forwardRef<HTMLDivElement, RowProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex {...props} ref={ref}>
        {children}
      </Flex>
    );
  },
);
