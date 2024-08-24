import { ReactNode } from 'react';

export interface PortalProps {
  children: ReactNode;
  container?: Element | DocumentFragment | undefined | null;
}
