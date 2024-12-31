import { getTime } from 'date-fns';

interface TempTask {
  taskId: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  depth: number;
  progress: number;
  status: number;
}

/**
 * 업무 그래프 정렬 순서
 * -----------------------
 * 1. 업무 속성 깊이가 낮은 순 (task의 perantTaskId 속성 요청해야 할 듯.)
 * 2. 종료 일정이 빠른 순
 * 3. 생성일이 빠른 순(createdAt 속성을 가져올 수 있는 지 여쭤봐야 합니다.)
 * 4. 제목의 가나다 순
 */

const sortGraphs = (graphs: TempTask[]) =>
  graphs.sort((firstGraph, secondGraph) => {
    if (getTime(firstGraph.endDate) !== getTime(secondGraph.endDate)) {
      return getTime(firstGraph.endDate) - getTime(secondGraph.endDate);
    }
    return firstGraph.title <= secondGraph.title ? -1 : 1;
  });

export default sortGraphs;
