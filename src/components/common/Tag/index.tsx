import { ReactComponent as CalendarIcon } from '@assets/calendar.svg';

import { DdayTag, SituationTag, WorkTag } from './Tag.style';
import { TAG_LIST } from './constants';
import {
  DdayProperty,
  SituationProperty,
  TagProps,
  WorkProperty,
} from './types';

export const Tag = ({ property, type }: TagProps) => {
  if (type === 'dday')
    return (
      <DdayTag>
        <CalendarIcon width="12" height="12" />
        {property as DdayProperty}
      </DdayTag>
    );
  return type === 'work' ? (
    <WorkTag property={property as WorkProperty}>
      {TAG_LIST.WORK_TAG[property as WorkProperty]}
    </WorkTag>
  ) : (
    <SituationTag property={property as SituationProperty}>
      {TAG_LIST.SITUATION_TAG[property as SituationProperty]}
    </SituationTag>
  );
};
