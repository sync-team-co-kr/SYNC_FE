import styled from 'styled-components';
import { vars } from 'token';

export const EmptyListContainer = styled.div`
  width: 100%;
  height: 100%;
  background: ${vars.sementic.color.primaryLightOrange};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const EmptyListImageContainer = styled.div`
  max-width: 400px;
  width: 100%;

  img {
    width: 100%;
    height: auto;
  }
`;

export const TypographyContainer = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
