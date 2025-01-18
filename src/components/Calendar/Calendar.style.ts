import styled from 'styled-components';
import { vars } from 'token';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 20px;
  flex-direction: column;
`;

export const TimeContainer = styled.section`
  display: flex;
  height: 100%;
  flex-direction: row;
`;

export const TimeTableLabel = styled.div`
  display: grid;
  grid-template-columns: 33px 2fr;
  column-gap: 10px;
  width: 100%;
`;

export const GraphItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 158px;
  padding: 9px;
  overflow-y: auto;
`;

export const GraphContainer = styled.section`
  display: grid;
  grid-template-columns: 33px 2fr;
  column-gap: 16px;
  align-items: center;
`;

export const TimeTableItem = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: repeat(78, 12px);
  padding: 6px 2.5px;
  border-top: 1px solid ${vars.sementic.color.black10};
  column-gap: 12px;
  grid-auto-flow: row;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      transparent calc(12px * 6 - 1px),
      ${vars.sementic.color.black10} calc(12px * 6),
      transparent calc(12px * 6 + 1px),
      transparent 100%
    );
    background-size: 100% calc(12px * 6 + 1px);
  }
`;

export const TimeTableContainer = styled.div`
  display: grid;

  grid-template-rows: repeat(78, 12px);
`;
