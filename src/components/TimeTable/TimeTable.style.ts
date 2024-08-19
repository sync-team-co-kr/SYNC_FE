import styled from 'styled-components';
import { vars } from 'token';

type TimeTableVariants = 'graph' | 'timeTableMedium' | 'timeTableLarge';
type TimeTableStatus = 'task' | 'sub' | 'quest';
const taskStateStyle = `
  background: ${vars.sementic.color.alertLightOrange};
  border: 1px solid ${vars.sementic.color.lightPurple}
`;

const subTaskStateStyle = `
  background: ${vars.sementic.color.primaryLightOrange};
  
`;

export const Container = styled.div<{
  percentage: number;
  variant: TimeTableVariants;
  status: TimeTableStatus;
}>`
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
  }}
  background: ${vars.sementic.color.lightPurple};
  width: ${(props) => props.percentage}%;
  border-radius: 4px;
  align-items: center;
`;
