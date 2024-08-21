import { ForwardedRef, forwardRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Typography } from '@components/common/Typography';

import {
  CalendarFilterDropdownContainer,
  CalendarFilterDropdownHeader,
} from './style';
import type { CalendarFilterDropdownProps } from './types';

const CalendarFilterDropdown = (
  {
    as: Component = CalendarFilterDropdownContainer,
    isOpen,
    setClose,
  }: CalendarFilterDropdownProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        typeof ref !== 'function' &&
        !!ref &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  if (isOpen) {
    return createPortal(
      <Component ref={ref}>
        <CalendarFilterDropdownHeader>
          <Typography color="black" variant="heading-5">
            필터
          </Typography>
        </CalendarFilterDropdownHeader>
      </Component>,
      document.body,
    );
  }
  return null;
};

export default forwardRef(CalendarFilterDropdown);
