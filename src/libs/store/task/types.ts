// task + project store
import { RawProject } from '@customTypes/project';

export type TaskStore = {
  projects: RawProject[];
};
export interface TaskActions {
  actions: {
    setProjects: (projects: RawProject[]) => void;
  };
}
