import styled from 'styled-components';
import { vars } from 'token';

import { SITUATION_TAGS_STYLE, WORK_TAGS_STYLE } from './constants';
import { SituationProperty, WorkProperty } from './types';

const TagBase = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: ${vars.sementic.typography['small-text-b'].fontSize};
  font-weight: ${vars.sementic.typography['small-text-b'].fontWeight};
  line-height: 14px;
`;

export const WorkTag = styled(TagBase)<{ property: WorkProperty }>`
  background-color: ${({ property }) =>
    WORK_TAGS_STYLE[property].backgroundColor};
  color: ${({ property }) => WORK_TAGS_STYLE[property].color};
`;

export const SituationTag = styled(TagBase)<{ property: SituationProperty }>`
  background-color: ${({ property }) =>
    SITUATION_TAGS_STYLE[property].backgroundColor};
  color: ${({ property }) => SITUATION_TAGS_STYLE[property].color};
`;

export const DdayTag = styled(TagBase)`
  background-color: ${vars.sementic.color.black10};
  color: ${vars.sementic.color.black35};
  display: flex;
  gap: 4px;
`;
