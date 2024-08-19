import React, { CSSProperties, ComponentPropsWithRef, forwardRef } from 'react';

import styled from 'styled-components';

type ColumnProps = {
  children: React.ReactNode;
} & CSSProperties &
  ComponentPropsWithRef<'div'>;

const Flex = Object.assign(styled.div`
  display: flex;
  flex-direction: column;
`);

export const Column = forwardRef<HTMLDivElement, ColumnProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex {...props} ref={ref}>
        {children}
      </Flex>
    );
  },
);
