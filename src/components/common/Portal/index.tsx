import { createPortal } from 'react-dom';

import { PortalProps } from './types';

export const Portal = ({ children, container }: PortalProps) => {
  if (!container) {
    return createPortal(children, document.body);
  }
  return createPortal(children, container);
};
