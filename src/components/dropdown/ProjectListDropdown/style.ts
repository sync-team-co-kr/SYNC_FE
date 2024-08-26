import styled from 'styled-components';
import { vars } from 'token';

export const DropdownContainer = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: absolute;
  width: 300px;
  padding: 12px 6px;
  flex-direction: column;
  align-items: flex-start;
  z-index: 2;
  gap: 8px;
  top: 50px;
  border-radius: 12px;
  border: 1px solid ${vars.sementic.color.black10};
  background-color: ${vars.sementic.color.white};

  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.05);
`;

export const DropdownItem = styled.div`
  display: flex;
  padding: 6px;
  align-items: center;
  gap: 12px;
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${vars.sementic.color.black10};
  }
`;

export const DropdownItemText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ImageWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  overflow: hidden;
  background-color: ${vars.sementic.color.black70};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
