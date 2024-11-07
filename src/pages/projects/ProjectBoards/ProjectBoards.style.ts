import React from 'react';

import { IStyledComponent, styled } from 'styled-components';
import { FastOmit } from 'styled-components/dist/types';

type projectBoardsStyleComponentList =
  | 'Wrapper'
  | 'HiddenTitle'
  | 'Header'
  | 'BoardList';

const StyleProjectBoards: {
  [key in projectBoardsStyleComponentList]: IStyledComponent<
    'web',
    FastOmit<
      React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
      never
    >
  >;
} = {
  Wrapper: styled.section`
    display: flex;
    flex-direction: column;
    padding: 0 0 0 40px;
  `,
  HiddenTitle: styled.article`
    margin-bottom: 20px;
  `,
  Header: styled.section`
    margin-bottom: 20px;
  `,
  BoardList: styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  `,
};

// const ProjectAddButton = styled.button`
//   height: 36px;
//   padding: 8px 24px;
//   background-color: var(--Primary-Orange-Yellow-Orange, #ffd880);
//   border: none;
//   border-radius: 8px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 12px;
//   cursor: pointer;
//   span {
//     color: var(--Black-White-Black-100, #202020);
//     /* Heading 5 */
//     font-family: Pretendard;
//     font-size: 14px;
//     font-style: normal;
//     font-weight: 700;
//     line-height: 17px;
//   }
// `;

export default StyleProjectBoards;
