import React from 'react';

import { IStyledComponent, styled } from 'styled-components';
import { FastOmit } from 'styled-components/dist/types';
import { vars } from 'token';

type projectBoardsStyleComponentList =
  | 'Wrapper'
  | 'ProjectTitleText'
  | 'List'
  | 'DescriptionText'
  | 'ProgressFrame'
  | 'Members'
  | 'Period';

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

  ProjectTitleText: styled.div`
    display: flex;
    > div {
      display: flex;
      flex-direction: column;
      padding-left: 10px;
      white-space: nowrap;
      overflow: hidden;
      .TitleText {
        color: var(--Black-White-Black-100, #202020);
        font-size: 16px;
        font-weight: 700;
        padding-bottom: 2px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .SubTitleText {
        color: var(--Black-White-Black-20, #8f8f8f);
        font-size: 12px;
        font-weight: 700;
        padding-top: 2px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  `,

  List: styled.table`
    width: 100%;
    table-layout: fixed;
    border: 1px solid var(--Black-White-Black-10, #f4f4f4);
    background: var(--Black-White-White, #fff);
    > thead {
      height: 40px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--Black-White-Black-10, #f4f4f4);
      background: #fff;
      > tr {
        color: var(--Black-White-Black-20, #bfbfbf);
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 17px;
        > th {
          padding: 12px 16px;
          text-align: start;
        }
      }
    }
    > tbody {
      > tr {
        height: 64px;
        border-bottom: 1px solid var(--Black-White-Black-10, #f4f4f4);
        > td {
          height: 100%;
          padding: 12px 16px;
          vertical-align: middle;
        }
      }
    }
    .ProjectTitle {
      width: 300px;
    }
    .ProjectMembers {
      width: 160px;
    }
    .ProjectCalendar {
      width: 240px;
    }
    .Filter {
      width: 80px;
    }
  `,

  DescriptionText: styled.div`
    width: 100%;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  ProgressFrame: styled.div`
    display: flex;
    height: 64px;
    width: 100%;
    align-items: center;
    gap: 8px;
    background: #fff;
    > div {
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
      > .BarGraphFrame1 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        align-self: stretch;
        > div {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 4px;
          > svg {
            width: 12px;
            height: 12px;
          }
          > div {
            color: var(--Black-White-Black-20, #bfbfbf);
            text-align: center;

            /* Small Text_B */
            font-family: Pretendard;
            font-size: 12px;
            font-style: normal;
            font-weight: 700;
            line-height: 14px; /* 116.667% */
          }
        }
        > .PercentText {
          color: var(--Black-White-Black-100, #202020);
          text-align: center;

          /* Small Text_B */
          font-family: Pretendard;
          font-size: 12px;
          font-style: normal;
          font-weight: 700;
          line-height: 14px; /* 116.667% */
        }
      }
      > .BarGraphFrame2 {
        display: flex;
        height: 12px;
        width: 100%;
        border-radius: 2px;
        background: var(--Black-White-Black-10, #f4f4f4);
      }
    }
  `,

  Members: styled.ul`
    display: flex;
    flex-direction: row;
    gap: -2px;
    > li {
      width: 28px;
      height: 28px;
      padding: 5px 1px;
      background: ${vars.sementic.color.lightBlue};
      border-radius: 100%;
      font-size: 12px;
      font-weight: 700;
      color: ${vars.sementic.color.positiveBlue};
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,

  Period: styled.div`
    padding: 4px 8px;
    width: 180px;
    background-color: var(--Black-White-Black-10, #f4f4f4);
    border-radius: 4px;
    display: flex;
    justify-content: space-around;
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

export default StyleProjectList;
