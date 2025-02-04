import { ForwardedRef, forwardRef, useRef } from 'react';

import { ReactComponent as Search } from '@assets/searchSM.svg';
import { Button } from '@components/common/Button';
import { Portal } from '@components/common/Portal';
import CalendarFilterDropdown from '@components/dropdown/CalendarFilterDropdown';
import { useModalState } from '@hooks/useModalState';

const CalendarFilterButton = (
  _: unknown,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const filterDropdownRef = useRef(null);
  const [isOpenFilter, openFilter, closeFilter] = useModalState();
  return (
    <>
      <Button
        onClick={openFilter}
        variant="outline"
        size="medium"
        text="필터"
        $hasIcon
        $isSelect={isOpenFilter}
        $renderIcon={<Search />}
      />
      <Portal
        container={typeof ref !== 'function' && !!ref ? ref.current : null}
      >
        <CalendarFilterDropdown
          ref={filterDropdownRef}
          isOpen={isOpenFilter}
          setClose={closeFilter}
        />
      </Portal>
    </>
  );
};

export default forwardRef(CalendarFilterButton);
