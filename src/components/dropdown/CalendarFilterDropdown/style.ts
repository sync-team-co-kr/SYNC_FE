import styled from 'styled-components';

export const CalendarFilterDropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 2;
  padding: 16px 20px 24px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.05);
  position: absolute;
  right: 55px;
  top: 210px;
`;

export const CalendarFilterDropdownHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
`;

export const FilterDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FilterDetailButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;
