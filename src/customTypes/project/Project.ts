import { IMember } from '@customTypes/member';

export default interface IProject {
  projectId: number;
  title: string;
  thumbnail: {
    type: 'N' | 'I' | 'C' | 'E';
    value: string;
  };
  subTitle: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
  members: IMember[];
}
