import React from 'react';

import { IStyledComponent, styled } from 'styled-components';
import { FastOmit } from 'styled-components/dist/types';

type projectBoardsStyleComponentList = 'Wrapper' | 'BoardList';

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
    margin: 0 40px 20px 40px;
    height: calc(100vh - 300px);
    overflow-x: auto;
  `,

  BoardList: styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  `,
};

export default StyleProjectBoards;
