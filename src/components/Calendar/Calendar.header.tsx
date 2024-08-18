import Textfield from '@components/common/Textfield';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const CalendarHeader = () => {
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
        
      </Section>
    </Container>
  );
};
