import { styled } from 'styled-components';
import { vars } from 'token';

export const ToggleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  div {
    font-size: 12px;
  }
`;

export const CrossDash = styled.div`
  width: 10px;
  height: 1px;
  background-color: ${vars.sementic.color.black20};
`;

export const ScheduleRegistrationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  align-self: stretch;
  label {
    flex-grow: 1;
  }
`;
