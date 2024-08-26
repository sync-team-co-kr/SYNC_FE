import { styled } from 'styled-components';

interface DropdownWrapperProps {
  $width: number;
  $isopen: boolean;
  $positionLeft?: number;
  $positionTop?: number;
}

export const DropdownWrapper = styled.section<DropdownWrapperProps>`
  width: ${(props) => `${props.$width}px`};
  padding: 12px 8px;
  background: #fff;
  border: 1px solid #b8b8b8;
  border-radius: 8px;
  box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.3);
  display: ${(props) => (props.$isopen ? 'flex' : 'none')};
  position: absolute;
  left: ${({ $positionLeft }) => ($positionLeft ? `${$positionLeft}px` : 0)};
  top: ${({ $positionTop }) => ($positionTop ? `${$positionTop}px` : 0)};
`;

export const DropdownItemList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;
