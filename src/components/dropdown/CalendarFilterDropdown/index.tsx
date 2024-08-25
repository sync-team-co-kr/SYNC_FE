import { ForwardedRef, forwardRef, useEffect, useState } from 'react';

import { Button } from '@components/common/Button';
import Textfield from '@components/common/Textfield';
import { Typography } from '@components/common/Typography';
import { useTaskFilterActions, useTaskFilterState } from '@libs/store/task';
import { Situation, WorkTags } from '@libs/store/task/types';

import { SITUATION_TAGS, WORK_TAGS } from './constants';
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
  const { setWorkState, setSituationState } = useTaskFilterActions();

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
            {Object.keys(WORK_TAGS).map((work) => (
              <Button
                isSelect={taskFilterState.workState.includes(work as WorkTags)}
                variant="outline"
                text={WORK_TAGS[work as WorkTags]}
                onClick={() => setWorkState(work as WorkTags)}
                size="small"
                key={work}
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
            {Object.keys(SITUATION_TAGS).map((situation) => (
              <Button
                isSelect={taskFilterState.situationState.includes(
                  situation as Situation,
                )}
                variant="outline"
                text={SITUATION_TAGS[situation as Situation]}
                onClick={() => setSituationState(situation as Situation)}
                size="small"
                key={situation}
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
