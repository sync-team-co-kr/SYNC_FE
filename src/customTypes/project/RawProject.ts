import { IMember } from '@customTypes/member';

export default interface RawProject {
  projectId: number;
  title: string;
  subTitle: string;
  description: string;
  startDate?: string;
  endDate?: string;
  members: IMember[];
}
