import { ForwardedRef, forwardRef, useEffect, useState } from 'react';

import { Button } from '@components/common/Button';
import Textfield from '@components/common/Textfield';
import { Typography } from '@components/common/Typography';
import { useTaskFilterActions, useTaskFilterState } from '@libs/store/task';
import { TaskState, TaskStatus } from '@libs/store/task/types';

import { FILTER_STATE, FILTER_STATUS } from './constants';
import {
  CalendarFilterDropdownContainer,
  CalendarFilterDropdownHeader,
  FilterDetailButtonGroup,
  FilterDetailContainer,
  FilterOwnerItem,
  FilterOwnerItemList,
  FilterOwnerList,
  SelectFilterOwnerItemList,
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
  const taskFilterState = useTaskFilterState();
  const [search, setSearch] = useState<string>('');
  const { setTaskFilterState, setTaskFilterStatus } = useTaskFilterActions();

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
    return (
      <Component ref={ref}>
        <CalendarFilterDropdownHeader>
          <Typography color="black" variant="heading-5">
            필터
          </Typography>
        </CalendarFilterDropdownHeader>
        <FilterDetailContainer>
          <Typography color="black35" variant="small-text-b">
            속성
          </Typography>
          <FilterDetailButtonGroup>
            {Object.keys(FILTER_STATUS).map((status) => (
              <Button
                isSelect={taskFilterState.filterStatus.includes(
                  status as TaskStatus,
                )}
                variant="outline"
                text={FILTER_STATUS[status as TaskStatus]}
                onClick={() => setTaskFilterStatus(status as TaskStatus)}
                size="small"
                key={status}
                hasIcon={false}
              />
            ))}
          </FilterDetailButtonGroup>
        </FilterDetailContainer>
        <FilterDetailContainer>
          <Typography color="black35" variant="small-text-b">
            상태
          </Typography>
          <FilterDetailButtonGroup>
            {Object.keys(FILTER_STATE).map((state) => (
              <Button
                isSelect={taskFilterState.filterState.includes(
                  state as TaskState,
                )}
                variant="outline"
                text={FILTER_STATE[state as TaskState]}
                onClick={() => setTaskFilterState(state as TaskState)}
                size="small"
                key={state}
                hasIcon={false}
              />
            ))}
          </FilterDetailButtonGroup>

          <FilterOwnerList>
            <Typography color="black35" variant="small-text-b">
              담당자
            </Typography>
            <SelectFilterOwnerItemList></SelectFilterOwnerItemList>
            <Textfield
              variant="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="검색"
            />
            <FilterOwnerItemList>
              <FilterOwnerItem isSelected={false}></FilterOwnerItem>
            </FilterOwnerItemList>
          </FilterOwnerList>
        </FilterDetailContainer>
      </Component>
    );
  }
  return null;
};

export default forwardRef(CalendarFilterDropdown);
