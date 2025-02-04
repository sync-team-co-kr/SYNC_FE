import { useContext, useRef } from 'react';

import { ReactComponent as ArrowLeft } from '@assets/arrow-left.svg';
import { ReactComponent as ArrowRight } from '@assets/arrow-right.svg';
import { Button } from '@components/common/Button';
import Textfield from '@components/common/Textfield';
import { Typography } from '@components/common/Typography';
import styled from 'styled-components';

import { CalendarContext } from './Calendar.provider';
import { returnDate } from './Calendar.utils';
import CalendarFilterButton from './components/Calendar.header/CalendarFilterButton';
import CalendarTaskButton from './components/Calendar.header/CalendarTaskButton';

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

  // calendar header
  const calendarHeaderRef = useRef<HTMLDivElement>(null);

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
          $hasIcon
          $renderIcon={<ArrowLeft />}
          size="medium"
          onClick={handlePrevClick}
        />
        <Button
          $renderIcon={<ArrowRight />}
          variant="outline"
          $hasIcon
          size="medium"
          onClick={handleNextClick}
        />
        <CalendarFilterButton ref={calendarHeaderRef} />
        <CalendarTaskButton ref={calendarHeaderRef} />
      </Section>
    </Container>
  );
};
