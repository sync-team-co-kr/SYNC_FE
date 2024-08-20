import { useContext } from 'react';

import { ReactComponent as ArrowLeft } from '@assets/arrow-left.svg';
import { ReactComponent as ArrowRight } from '@assets/arrow-right.svg';
import { ReactComponent as Search } from '@assets/searchSM.svg';
import { ReactComponent as ProjectIcon } from '@assets/sideBar/project-icon.svg';
import { Button } from '@components/common/Button';
import Textfield from '@components/common/Textfield';
import { Typography } from '@components/common/Typography';
import styled from 'styled-components';
import { vars } from 'token';

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
  const { value, setValue, type } = useContext(CalendarContext);

  const date = returnDate(value, type);
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
          onClick={() => {
            console.log('필터 버튼 클릭');
          }}
          variant="outline"
          size="medium"
          text="필터"
          hasIcon
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
          onClick={() => {
            console.log('일정 등록');
          }}
        />
      </Section>
    </Container>
  );
};
