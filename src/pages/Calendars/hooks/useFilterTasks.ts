import { useEffect, useState } from 'react';

import { ITask } from '@customTypes/task';
import { useTaskFilterState } from '@libs/store/calendar/filterOptions';

type useFilterTasksType = (tasks?: ITask[]) => ITask[] | undefined;

/**
 * workState: "task" | "subtask" | "quest"
 * situationState: 'todo' | 'done' | 'doing'
 */

const useFilterTasks: useFilterTasksType = (tasks) => {
  const taskFilterState = useTaskFilterState();
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    // 선택된 업무 depth 필터링에 통과하는 업무 목록 반환
    const filteredTaskByDepth = tasks?.filter((task) => {
      if (taskFilterState.workState.length === 0) return task;
      const workStateRecord: Record<string, number> = {
        task: 0,
        subTask: 1,
        quest: 2,
      };
      const IntArrayWorkState = taskFilterState.workState.map(
        (depth) => workStateRecord[depth],
      );
      return IntArrayWorkState.includes(task.depth);
    });

    // 선택된 업무 status 필터링에 통과하는 업무 목록 반환
    const filteredTaskByStatus = filteredTaskByDepth?.filter((task) => {
      if (taskFilterState.situationState.length === 0) return task;
      const situationStateRecord: Record<string, number> = {
        todo: 0,
        doing: 1,
        done: 2,
      };
      const IntArraySituationState = taskFilterState.situationState.map(
        (depth) => situationStateRecord[depth],
      );
      return IntArraySituationState.includes(task.status);
    });

    setFilteredTasks(filteredTaskByStatus);
  }, [
    `${taskFilterState.workState.join(',')}${taskFilterState.situationState.join(',')}`,
  ]);
  return filteredTasks;
};

export default useFilterTasks;
