import { Button } from '@components/common/Button';
import styled from 'styled-components';
import { vars } from 'token';

export const Container = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
`;

export const ContainerHeader = styled.div`
  width: 100%;
  padding-bottom: 32px;
  display: inline-flex;
  justify-content: space-between;
`;

export const ContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  position: relative;
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 338px;
  gap: 8px;
  position: relative;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const TaskButton = styled(Button)<{ works: string }>`
  ${({ works }) => {
    switch (works) {
      case 'task':
        return `
        border: 1px solid ${vars.sementic.color.purple};
        color: ${vars.sementic.color.purple};
      `;

      case 'subTask':
        return `
        border: 1px solid ${vars.sementic.color.alertOrange};
        color: ${vars.sementic.color.alertOrange};
      `;

      case 'quest':
        return `
        border: 1px solid ${vars.sementic.color.green};
        color: ${vars.sementic.color.green};
      `;

      default:
        return `
        border: 1px solid ${vars.sementic.color.purple};
        color: ${vars.sementic.color.purple};
      `;
    }
  }}
`;
