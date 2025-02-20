// import Add from '@assets/add.svg';
import { useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import TaskBoardItem from '@components/Task/SpecificStatusTasks';
import { useBreadCrumbActions } from '@libs/store/breadcrumb/breadcrumb';
import {
  useDraggingTempTaskActions,
  useDraggingTempTaskState,
} from '@libs/store/task/draggingTempTask';
import { useGetProject } from '@services/project/Project.hooks';
import { useGetTaskChildren, useGetTasks } from '@services/task';
import { vars } from 'token';

import { StyledTaskBoardList } from './Tasks.style';

export interface Project {
  projectId: number;
  title: string;
  subTitle: string;
  description: string;
  startDate: Date;
  endDate: Date;
  memberIds: number[];
}
const TaskBoardList = () => {
  const { projectId, taskId } = useParams();
  const location = useLocation();
  const state = location.state as {
    projectId: number;
  } | null;
  const projectIdRef = useRef(state?.projectId || Number(projectId));

  const { tasks, isFetching: isTaskFetching } = useGetTasks(Number(projectId));
  const { project } = useGetProject(projectIdRef.current);
  const { taskChildren, isFetching: isTaskChildrenFetching } =
    useGetTaskChildren(Number(taskId));

  const { originalTasks, draggingTempTasks } = useDraggingTempTaskState();
  const { setOriginalTasks } = useDraggingTempTaskActions();
  const { setProjectRoute } = useBreadCrumbActions();

  useEffect(() => {
    if (project) setProjectRoute(project.title);
    return () => {
      setProjectRoute('');
    };
  }, [project]);

  useEffect(() => {
    if (taskChildren && taskChildren.subTasks) {
      setOriginalTasks(taskChildren.subTasks);
    }
    if (tasks) {
      setOriginalTasks(tasks);
    }
  }, [isTaskFetching, isTaskChildrenFetching]);

  if (!originalTasks) return <div>Task가 없을 때의 페이지</div>;
  if (draggingTempTasks)
    return (
      <StyledTaskBoardList>
        <TaskBoardItem
          title="해야할 일"
          titleColor="negativeRed"
          borderColor={vars.sementic.color.black10}
          backgroundColor={vars.sementic.color.lightRed}
          projectId={projectIdRef.current}
          tasks={draggingTempTasks.filter((task) => task.status === 0)}
        />
        <TaskBoardItem
          title="하는 중"
          titleColor="positiveBlue"
          borderColor={vars.sementic.color.black10}
          backgroundColor={vars.sementic.color.lightBlue}
          projectId={projectIdRef.current}
          tasks={draggingTempTasks.filter((task) => task.status === 1)}
        />
        <TaskBoardItem
          title="완료"
          titleColor="black35"
          borderColor={vars.sementic.color.black10}
          projectId={projectIdRef.current}
          tasks={draggingTempTasks.filter((task) => task.status === 2)}
          backgroundColor={vars.sementic.color.black10}
        />
      </StyledTaskBoardList>
    );
  return (
    <StyledTaskBoardList>
      <TaskBoardItem
        title="해야할 일"
        titleColor="negativeRed"
        borderColor={vars.sementic.color.black10}
        backgroundColor={vars.sementic.color.lightRed}
        projectId={projectIdRef.current}
        tasks={originalTasks.filter((task) => task.status === 0)}
      />
      <TaskBoardItem
        title="하는 중"
        titleColor="positiveBlue"
        borderColor={vars.sementic.color.black10}
        backgroundColor={vars.sementic.color.lightBlue}
        projectId={projectIdRef.current}
        tasks={originalTasks.filter((task) => task.status === 1)}
      />
      <TaskBoardItem
        title="완료"
        titleColor="black35"
        borderColor={vars.sementic.color.black10}
        projectId={projectIdRef.current}
        tasks={originalTasks.filter((task) => task.status === 2)}
        backgroundColor={vars.sementic.color.black10}
      />
    </StyledTaskBoardList>
  );
};

export default TaskBoardList;
