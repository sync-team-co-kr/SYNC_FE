import React, { useEffect, useRef } from 'react';

import { ReactComponent as CloseX } from '@assets/cancel-x.svg';
import { modalStore } from '@libs/store';
import styled from 'styled-components';
import { vars } from 'token';

import { Button } from './Button';
import ModalPortal from './ModalPortal';

const ModalWrapperContainer = styled.div<{ $isActive: boolean }>`
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10;
  display: ${(props) => (props.$isActive ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
`;

const Container = styled.section`
  padding: 50px;
  max-height: 742px;
  overflow-y: auto;
  background: #fff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const ModalHeader = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    ${vars.sementic.typography['heading-3']};
    color: ${vars.sementic.color.black};
  }
`;

export interface ModalRef {
  children: React.ReactNode;
  isOpen: boolean;
}

export default function ModalWrapper({ children, isOpen }: ModalRef) {
  const { title, closeModal } = modalStore();

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeModal]);

  return (
    <ModalPortal>
      <ModalWrapperContainer $isActive={isOpen}>
        <Container ref={modalRef}>
          <ModalHeader>
            <h3>{title}</h3>
            <Button
              $hasIcon
              $renderIcon={<CloseX width={24} height={24} />}
              onClick={closeModal}
              size="small"
              variant="text"
            />
          </ModalHeader>
          {children}
        </Container>
      </ModalWrapperContainer>
    </ModalPortal>
  );
}
