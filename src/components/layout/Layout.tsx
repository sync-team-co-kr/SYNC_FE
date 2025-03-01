import React from 'react';
import { Outlet } from 'react-router-dom';

import { ModalWrapper } from '@components/common';
import Toast from '@components/common/Toast';
import { modalStore } from '@libs/store';
import styled from 'styled-components';
import { vars } from 'token';

import Header from './Header';
import SideBar from './SideBar';

const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: ${vars.sementic.color.primaryLightOrange};
  padding: 68px 0 30px 80px;
  box-sizing: border-box;
`;

export default function Layout() {
  const { isModalOpen, ModalComponent } = modalStore();

  return (
    <>
      <Toast />
      <Header />

      <SideBar />
      <Main>
        <Outlet />
        {isModalOpen && ModalComponent && (
          <ModalWrapper isOpen={isModalOpen}>
            <ModalComponent />
          </ModalWrapper>
        )}
      </Main>
    </>
  );
}
