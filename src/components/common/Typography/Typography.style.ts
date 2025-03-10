import styled from 'styled-components';
import { vars } from 'token';

import { TypographyStyledComponentsProps } from './Typography.types';

export const TypographyComponent = styled.p<TypographyStyledComponentsProps>`
  font-size: ${({ $variant }) => vars.sementic.typography[$variant].fontSize};
  font-weight: ${({ $variant }) =>
    vars.sementic.typography[$variant].fontWeight};
  color: ${({ color }) => vars.sementic.color[color]};
  line-height: 1.5;

  font-family: Pretendard;
`;
