import { SituationTag, WorkTag } from './Tag.style';
import { TAG_LIST } from './constants';
import { SituationProperty, TagProps, WorkProperty } from './types';

export const Tag = ({ property, type }: TagProps) => {
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
