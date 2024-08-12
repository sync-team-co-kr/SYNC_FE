import React from 'react';
import { Outlet } from 'react-router-dom';

import { ModalWrapper } from '@components/common';
import { modalStore } from '@libs/store';
import styled from 'styled-components';

import Header from './Header';
import SideBar from './SideBar';

const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  // pading = header 68 + padding 12px / sidebar 80px + padding 40px
  padding: 80px 0 0 120px;
`;

export default function Layout() {
  const { isModalOpen, ModalComponent } = modalStore();

  return (
    <>
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
