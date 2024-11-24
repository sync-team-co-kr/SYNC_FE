import React from 'react';

import { IStyledComponent, styled } from 'styled-components';
import { FastOmit } from 'styled-components/dist/types';

type modifyProjectModalStyleComponentList =
  | 'Header'
  | 'Form'
  | 'InputArea'
  | 'ToggleArea'
  | 'CalendarArea'
  | 'Submit';

const StyleModifyProjectModal: {
  [key in modifyProjectModalStyleComponentList]: IStyledComponent<
    'web',
    FastOmit<
      React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
      never
    >
  >;
} = {
  Header: styled.section`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    h1 {
      color: var(--main-black, #000);
      font-family: Pretendard;
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
    button {
      background-color: transparent;
      border: none;
    }
  `,
  Form: styled.form`
    width: 472px;
    background: #fff;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    flex-shrink: 0;
  `,
  InputArea: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    label {
      color: var(--Black-White-Black-35, #8f8f8f);
      /* Small Text_B */
      font-family: Pretendard;
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: 14px; /* 116.667% */
    }
    input {
      padding: 12px 8px;
      border: 1px solid var(--Black-White-Black-20, #bfbfbf);
      border-radius: 4px;
      color: var(--Black-White-Black-70, #636363);
      /* Paragraph */
      font-family: Pretendard;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px; /* 142.857% */
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `,
  ToggleArea: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    div {
      font-size: 12px;
    }
  `,
  CalendarArea: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    align-self: stretch;
    label {
      flex-grow: 1;
    }
  `,
  Submit: styled.div`
    padding: 32px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
    * {
      height: 42px;
      padding: 8px 24px;
      background: var(--Black-White-White, #fff);

      color: var(--Black-White-Black-70, #636363);
      /* Heading 5 */
      font-family: Pretendard;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 17px; /* 121.429% */

      border: none;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    input[type='submit'] {
      background: var(--Primary-Orange-Yellow-Orange, #ffd880);
    }
  `,
};

export default StyleModifyProjectModal;
