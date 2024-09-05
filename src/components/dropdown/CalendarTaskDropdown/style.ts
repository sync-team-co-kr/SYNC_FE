import styled from 'styled-components';
import { vars } from 'token';

export const CalendarTaskDropdownContainer = styled.div`
  border-radius: 8px;
  padding: 0 32px;
  flex-direction: column;
  width: 548px;
  position: absolute;
  top: 50px;
  right: 0;
  background-color: ${vars.sementic.color.white};
  z-index: 2;
  gap: 8px;
  border: 1px solid ${vars.sementic.color.black10};
  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.05);
`;

export const CalendarTaskDropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 32px 0;
  align-items: center;
`;

export const CalendarTaskDropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 0 32px 0;
`;

export const TaskSelectItemList = styled.div`
  width: 100%;
  display: flex;
  gap: 24px;
  flex-direction: column;
`;

export const TaskSelectItem = styled.div``;
