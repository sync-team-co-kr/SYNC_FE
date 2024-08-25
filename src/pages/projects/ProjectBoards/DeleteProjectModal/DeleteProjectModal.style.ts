import React from 'react';

import { IStyledComponent, styled } from 'styled-components';
import { FastOmit } from 'styled-components/dist/types';

type deleteProjectModalStyleComponentList = 'Header' | 'Form' | 'Submit';

const StyleDeleteProjectModal: {
  [key in deleteProjectModalStyleComponentList]: IStyledComponent<
    'web',
    FastOmit<
      React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
      never
    >
  >;
} = {
  Header: styled.article`
    display: flex;
    flex-direction: column;
    gap: 15px;
    h2 {
      color: var(--main-black, #000);
      font-family: Pretendard;
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
    p {
      color: var(--Alert-Color-Negative-Red, #ed6863);
      /* Paragraph */
      font-family: Pretendard;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px; /* 142.857% */
    }
  `,
  Form: styled.form`
    width: 490px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: stretch;
    gap: 32px;
  `,
  Submit: styled.div`
    padding: 32px 0;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  `,
};

export default StyleDeleteProjectModal;
