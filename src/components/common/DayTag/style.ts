import { styled } from 'styled-components';
import { vars } from 'token';

import { DayTagProps } from './types';

export const DayTagsComponent = styled.div<{
  $variant: DayTagProps['variant'];
}>`
  padding: 4px 8px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
  font-size: ${vars.sementic.typography['small-text-b'].fontSize};
  font-weight: ${vars.sementic.typography['small-text-b'].fontWeight};
  border-radius: 4px;
  background-color: ${({ $variant }) =>
    $variant !== 'periodB'
      ? vars.sementic.color.black10
      : vars.sementic.color.white};

  color: ${({ $variant }) =>
    $variant !== 'periodB'
      ? vars.sementic.color.black35
      : vars.sementic.color.black};
`;
