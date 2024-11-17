import React from 'react';

import { IStyledComponent, styled } from 'styled-components';
import { FastOmit } from 'styled-components/dist/types';

type projectBoardsStyleComponentList =
  | 'Wrapper'
  | 'List'
  | 'ProjectListHeader'
  | 'ProjectListHeaderText';

const StyleProjectList: {
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
    height: calc(100vh - 300px);
    background: var(--Black-White-White, #fff);
    margin: 0 40px 20px 40px;
    border-radius: 12px;
    border: 1px solid var(--Black-White-Black-10, #f4f4f4);
    flex-direction: column;
    overflow-x: auto;
  `,

  List: styled.ul`
    border: 1px solid var(--Black-White-Black-10, #f4f4f4);
    background: var(--Black-White-White, #fff);
  `,

  ProjectListHeader: styled.header`
    display: flex;
    height: 40px;
    padding: 12px 16px;
    align-items: center;
    border-bottom: 1px solid var(--Black-White-Black-10, #f4f4f4);
    background: #fff;
  `,

  ProjectListHeaderText: styled.ul`
    width: 100%;
    color: var(--Black-White-Black-20, #bfbfbf);

    /* Heading 5 */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 17px;
  `,
};

export const TitleHeader = styled(StyleProjectList.ProjectListHeader)`
  flex: 5;
`;

export const DescriptionHeader = styled(StyleProjectList.ProjectListHeader)`
  flex: 5;
`;

export const ProgressHeader = styled(StyleProjectList.ProjectListHeader)`
  flex: 5;
`;

export const ManagerHeader = styled(StyleProjectList.ProjectListHeader)`
  flex: 2;
`;

export const RemainTimeHeader = styled(StyleProjectList.ProjectListHeader)`
  flex: 2;
`;

export const EtcHeader = styled(StyleProjectList.ProjectListHeader)`
  flex: 1;
`;

export default StyleProjectList;
