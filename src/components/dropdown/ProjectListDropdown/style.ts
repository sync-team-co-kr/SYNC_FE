import styled from 'styled-components';
import { vars } from 'token';

export const DropdownContainer = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: absolute;
  width: 300px;
  padding: 12px 0;
  flex-direction: column;
  align-items: flex-start;
  z-index: 2;
  border-radius: 12px;
  border: 1px solid ${vars.sementic.color.black10};
  background-color: ${vars.sementic.color.white};

  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.05);
`;
