import React from 'react';

import { IStyledComponent, styled } from 'styled-components';
import { FastOmit } from 'styled-components/dist/types';

type projectBoardStyleComponentList =
  | 'BoardArea'
  | 'Header'
  | 'Title'
  | 'Description'
  | 'Footer'
  | 'Period';

const StyleProjectBoard: {
  [key in projectBoardStyleComponentList]: IStyledComponent<
    'web',
    FastOmit<
      React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
      never
    >
  >;
} = {
  BoardArea: styled.li`
    padding: 20px;
    border-radius: 12px;
    border: 1px solid var(--Black-White-Black-10, #f4f4f4);
    background: var(--Black-White-White, #fff);
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  Header: styled.section`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    img {
      width: 28px;
      height: 28px;
    }
  `,
  Title: styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    gap: 2px;
    h5 {
      color: var(--Black-White-Black-35, #8f8f8f);
      /* Small Text_B */
      font-family: Pretendard;
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: 14px; /* 116.667% */
    }
    h2 {
      color: var(--Black-White-Black-100, #202020);
      /* Heading 4 */
      font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 21px; /* 131.25% */
    }
  `,
  Description: styled.p`
    height: 40px;
    overflow: hidden;
    color: var(--Black-White-Black-100, #202020);
    text-overflow: ellipsis;
    white-space: nowrap;
    /* Paragraph */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
  `,
  Footer: styled.section`
    padding: 0 1px;
    display: flex;
    justify-content: space-between;
    align-items: conter;
  `,
  Period: styled.div`
    padding: 4px 8px;
    background-color: var(--Black-White-Black-10, #f4f4f4);
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
    p {
      color: var(--Black-White-Black-35, #8f8f8f);
      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
  `,
};

export default StyleProjectBoard;
