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

export const Container = styled.div<{
  percentage: number;
  variant: TimeTableVariants;
  status: TimeTableStatus;
}>`
  display: flex;
  cursor: pointer;
  ${(props) => stateStyle[props.status]};
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
