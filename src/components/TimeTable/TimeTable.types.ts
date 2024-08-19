/**
 * @interface TimeTableProps
 * @param {string} title - 타이틀
 * @param {string} description - 설명
 * @param {Date} startTime - 시작 시간
 * @param {Date} endTime - 종료 시간
 * @param {string} images - 이미지
 * @param {number} projectId - 프로젝트 아이디
 * @param {number} parentTaskId - 부모 태스크 아이디
 * @param {number} status - 상태
 */
export interface TimeTableProps {
  title: string;
  description: string;
  onClick?: () => void;
  startTime: string;
  endTime: string;
  images: string;
  projectId: number;
  parentTaskId: number;
  status: 'task' | 'sub' | 'quest';
  variant: 'graph' | 'timeTableMedium' | 'timeTableLarge';
}
