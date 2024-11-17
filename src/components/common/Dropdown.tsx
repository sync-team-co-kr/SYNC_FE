import React from 'react';

import styled from 'styled-components';
import { vars } from 'token';

const ClickEventContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const DropdownWrapper = styled.section<{
  $isActive: boolean;
  $left: string;
  $bottom: string;
}>`
  display: ${(props) => (props.$isActive ? 'flex' : 'none')};
  position: absolute;
  width: 250px;
  flex-direction: column;
  border: 1px solid ${vars.sementic.color.black10};
  background-color: ${vars.sementic.color.white};
  border-radius: 8px;
  box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.3);
  left: ${(props) => props.$left};
  bottom: ${(props) => props.$bottom};
  z-index: 2;
  gap: 8px;
  cursor: pointer;
  align-items: flex-start;
  border-radius: 12px;
  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.05);
`;

export interface DropdownProps {
  children: React.ReactNode;
  isOpen: boolean;
  dropdownRef: React.RefObject<HTMLTableSectionElement>;
  left: string;
  bottom: string;
}

export default function Dropdown({
  children,
  isOpen,
  dropdownRef,
  left,
  bottom,
}: DropdownProps) {
  return (
    <ClickEventContainer ref={dropdownRef}>
      <DropdownWrapper $isActive={isOpen} $left={left} $bottom={bottom}>
        {children}
      </DropdownWrapper>
    </ClickEventContainer>
  );
}
