export type WorkProperty = 'task' | 'subTask' | 'quest';
export type SituationProperty = 'todo' | 'doing' | 'done';
export type DdayProperty = string | number;

type TagType = 'work' | 'situation' | 'dday';
export interface TagProps {
  type: TagType;
  property: WorkProperty | SituationProperty | DdayProperty;
}
