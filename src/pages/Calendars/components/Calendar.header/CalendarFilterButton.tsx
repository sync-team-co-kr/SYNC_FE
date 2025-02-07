import { ForwardedRef, forwardRef } from 'react';

import { ReactComponent as Search } from '@assets/searchSM.svg';
import { Button } from '@components/common/Button';
import { Portal } from '@components/common/Portal';
import CalendarFilterDropdown from '@components/dropdown/CalendarFilterDropdown';
import useDropdown from '@hooks/useDropdown';

const CalendarFilterButton = (
  _: unknown,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const [isOpenFilter, toggleFilter, filterDropdownRef] = useDropdown();
  return (
    <>
      <Button
        onClick={toggleFilter}
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
          setClose={toggleFilter}
        />
      </Portal>
    </>
  );
};

export default forwardRef(CalendarFilterButton);
