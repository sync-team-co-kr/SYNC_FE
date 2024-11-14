import { IMember } from '@customTypes/member';

/**
 * Thumbnail 타입 설명
 * N : Thumbnail 없음
 * I : 이미지
 * C : 아이콘
 * E : 이모지
 */

export default interface RawProject {
  projectId: number;
  title: string;
  thumbnail?: string;
  thumbnailType?: 'N' | 'I' | 'C' | 'E';
  subTitle: string;
  description: string;
  startDate?: string;
  endDate?: string;
  members: IMember[];
}
