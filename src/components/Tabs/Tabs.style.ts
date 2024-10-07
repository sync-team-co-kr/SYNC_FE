import { css, styled } from 'styled-components';
import { vars } from 'token';

export const tabListStyle = () => {
  return css({
    '[role="tab"]': {
      gap: '12px',

      transition: 'color 0.3s ease-out',
      color: vars.sementic.color.black35,
      borderBottom: `2px solid transparent`,

      '&:not(:disabled)[data-selected="true"]': {
        color: vars.sementic.color.black,
        borderBottom: `2px solid ${vars.sementic.color.primaryOrange}`,
      },
    },
  });
};

export const TabElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 4px;
  padding: 8px 24px;
  ${vars.sementic.typography['heading-5']};
`;

export const TabListElement = styled.div<{ padding?: string }>`
  position: relative;
  display: inline-flex;
  padding: ${({ padding }) => padding || '40px 12px 0 40px;'};
  width: 100%;
  border-bottom: 1px solid ${vars.sementic.color.black10};
  white-space: nowrap;
  gap: 12px;
  ${tabListStyle()};
`;

export const TabPanelElement = styled.div<{ padding?: string }>`
  padding: ${({ padding }) => padding || '24px 40px'};
  width: 100%;
`;
