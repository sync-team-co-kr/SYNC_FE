import { CSSProperties } from 'styled-components';

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
  onDoubleClick?: () => void;
  startTime: string;
  endTime: string;
  images: string;
  parentTaskId: number;
  gridRowStart?: number;
  rowSpan?: number;
  status: 'task' | 'sub' | 'quest';
  variant: 'graph' | 'timeTableMedium' | 'timeTableLarge';
  moveDayCalendar?: () => void;
}
