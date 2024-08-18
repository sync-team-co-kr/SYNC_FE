import { useContext } from 'react';

import Textfield from '@components/common/Textfield';
import styled from 'styled-components';

import { CalendarContext } from './Calendar.provider';
import { returnDate } from './Calendar.utils';

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const CalendarHeader = () => {
  const { value, setValue } = useContext(CalendarContext);

  const date = returnDate(value);
  const handlePrevClick = () => {
    setValue('prev');
  };
  const handleNextClick = () => {
    setValue('next');
  };

  return (
    <Container>
      <Textfield
        variant="search"
        helperText="검색어를 입력하세요"
        placeholder="검색"
        type="search"
        width="198px"
      />
      <Section>{date}</Section>
      <Section>
        <button onClick={handlePrevClick}>prev</button>
        <button onClick={handleNextClick}>next</button>
      </Section>
    </Container>
  );
};
