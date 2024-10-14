import styled from 'styled-components';
import { vars } from 'token';

type TimeTableVariants = 'graph' | 'timeTableMedium' | 'timeTableLarge';
type TimeTableStatus = 'task' | 'sub' | 'quest';
const taskStateStyle = `
  background: ${vars.sementic.color.lightPurple};
  border: 1px solid ${vars.sementic.color.strokeLightPurple};
`;

const subTaskStateStyle = `
  background: ${vars.sementic.color.alertLightOrange};
  border: 1px solid ${vars.sementic.color.strokeLightOrange};  
`;

const questStateStyle = `
  background: ${vars.sementic.color.lightGreen};
  border: 1px solid ${vars.sementic.color.strokeLightGreen};
`;

const stateStyle = {
  task: taskStateStyle,
  sub: subTaskStateStyle,
  quest: questStateStyle,
};

export const ImageWrapper = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  border-radius: 2px;
  overflow: hidden;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
  }
`;

const makerTimeTableStyle = {
  graph: `
    width: 4px;
    height: 100%;
  `,
  timeTableMedium: `
    width: 6px;
    height: 20px;
  `,
  timeTableLarge: `
    width: 6px;
    height: 20px;
  `,
};

export const Marker = styled.div<{
  statue: TimeTableStatus;
  variant: TimeTableVariants;
}>`
  ${(props) => makerTimeTableStyle[props.variant]};
  border-radius: 999px;
  background: ${(props) => {
    switch (props.statue) {
      case 'task':
        return vars.sementic.color.purple;
      case 'sub':
        return vars.sementic.color.alertOrange;
      case 'quest':
        return vars.sementic.color.green;
      default:
        return vars.sementic.color.purple;
    }
  }};
`;

/**
 * 시간표 컴포넌트
 * rowSpan과 gridRowStart를 받아서 해당 위치에 배치
 */

export const Container = styled.div<{
  percentage: number;
  variant: TimeTableVariants;
  status: TimeTableStatus;
  gridRowStart?: number;
  rowSpan?: number;
}>`
  z-index: 1;
  display: flex;
  cursor: pointer;
  margin-top: 12px;
  ${(props) => stateStyle[props.status]};
  ${(props) =>
    props.rowSpan &&
    props.gridRowStart &&
    `
        grid-row-start: ${props.gridRowStart};
        grid-row-end: ${props.rowSpan + props.gridRowStart};
      `}
  padding: ${(props) => {
    switch (props.variant) {
      case 'graph':
        return '4px';
      case 'timeTableMedium':
        return '4px 6px';
      case 'timeTableLarge':
        return '4px 8px';
      default:
        return '4px';
    }
  }};
  gap: 8px;
  width: ${(props) => props.percentage}%;
  border-radius: 4px;
  align-items: center;
`;
