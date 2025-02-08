import { IMember } from '@customTypes/member';

interface RawTask {
  description?: string;
  endDate?: string;
  startDate?: string;
  title: string;
  thumbnailIcon?: string;
  /**
   * 상위 업무 아이디
   * null == 프로젝트 최상위 업무
   * 1 : 서브 테스크
   * 2: 퀘스트
   */
  parentTaskId?: number;
  projectId: number;
  /**
   * 업무 상태 ( 0: 진행중, 1: 완료, 2: 보류)
   */
  status: number;
  taskManagers?: IMember[];
}

export default RawTask;
