import { useContext, useRef } from 'react';

import { ReactComponent as ArrowLeft } from '@assets/arrow-left.svg';
import { ReactComponent as ArrowRight } from '@assets/arrow-right.svg';
import { ReactComponent as Search } from '@assets/searchSM.svg';
import { ReactComponent as ProjectIcon } from '@assets/sideBar/project-icon.svg';
import { Button } from '@components/common/Button';
import { Portal } from '@components/common/Portal';
import Textfield from '@components/common/Textfield';
import { Typography } from '@components/common/Typography';
import CalendarFilterDropdown from '@components/dropdown/CalendarFilterDropdown';
import CalendarTaskDropdown from '@components/dropdown/CalendarTaskDropdown';
import { useModalState } from '@hooks/useModalState';
import styled from 'styled-components';
import { vars } from 'token';

import { CalendarContext } from './Calendar.provider';
import { returnDate } from './Calendar.utils';

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: relative;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const CalendarHeader = () => {
  const { value, setValue, type } = useContext(CalendarContext);
  // filter dropdown
  const filterDropdownRef = useRef(null);
  // calendar header
  const calendarHeaderRef = useRef(null);

  // task dropdown
  const taskDropdownRef = useRef(null);

  const [isOpenFilter, openFilter, closeFilter] = useModalState();
  const [isOpenTask, openTask, closeTask] = useModalState();

  const date = returnDate(value, type);
  const handlePrevClick = () => {
    setValue('prev', type);
  };
  const handleNextClick = () => {
    setValue('next', type);
  };

  return (
    <Container ref={calendarHeaderRef}>
      <Textfield
        variant="search"
        helperText="검색어를 입력하세요"
        placeholder="검색"
        type="search"
        width="198px"
      />
      <Section>
        <Typography color="black" variant="heading-4">
          {date}
        </Typography>
        <Button
          variant="outline"
          hasIcon
          renderIcon={<ArrowLeft />}
          size="medium"
          onClick={handlePrevClick}
        />
        <Button
          renderIcon={<ArrowRight />}
          variant="outline"
          hasIcon
          size="medium"
          onClick={handleNextClick}
        />
        <Button
          onClick={openFilter}
          variant="outline"
          size="medium"
          text="필터"
          hasIcon
          isSelect={isOpenFilter}
          renderIcon={<Search />}
        />
        <Button
          hasIcon
          renderIcon={
            <ProjectIcon
              width={18}
              height={18}
              strokeWidth={1.5}
              stroke={vars.sementic.color.black70}
            />
          }
          variant="outline"
          size="medium"
          text="일정 등록"
          onClick={openTask}
          isSelect={isOpenTask}
        />
      </Section>
      <Portal container={calendarHeaderRef?.current}>
        <CalendarFilterDropdown
          ref={filterDropdownRef}
          isOpen={isOpenFilter}
          setClose={closeFilter}
        />
      </Portal>

      <Portal container={calendarHeaderRef?.current}>
        <CalendarTaskDropdown
          isOpen={isOpenTask}
          setClose={closeTask}
          ref={taskDropdownRef}
        />
      </Portal>
    </Container>
  );
};
