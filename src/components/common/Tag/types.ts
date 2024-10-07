export type WorkProperty = 'task' | 'subTask' | 'quest';
export type SituationProperty = 'todo' | 'doing' | 'done';

type TagType = 'work' | 'situation';
export interface TagProps {
  type: TagType;
  property: WorkProperty | SituationProperty;
}
