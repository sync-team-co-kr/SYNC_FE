import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  useBreadCrumbActions,
  useBreadCrumbState,
} from '@libs/store/breadcrumb/breadcrumb';
import { useDraggingTempTaskActions } from '@libs/store/task/draggingTempTask';
import { useGetProject } from '@services/project/Project.hooks';
import { useGetTaskChildren } from '@services/task/Task.hooks';

import BoardsContainerUI from './BoardsContainerUI';

const SubTaskBoards = () => {
  const { projectId, taskId } = useParams();

  const { project } = useGetProject(Number(projectId));
  const { taskChildren, isFetching } = useGetTaskChildren(Number(taskId));

  const { setOriginalTasks } = useDraggingTempTaskActions();
  const { projectRoute } = useBreadCrumbState();
  const { setProjectRoute, setProjectLink } = useBreadCrumbActions();

  useEffect(() => {
    if (taskChildren && taskChildren.subTasks) {
      const subTasksWithParentTaskId = taskChildren.subTasks.map((subTask) => ({
        ...subTask,
        parentTaskId: Number(taskId),
      }));
      setOriginalTasks(subTasksWithParentTaskId);
    }
  }, [isFetching]);

  useEffect(() => {
    setProjectRoute({
      project: projectRoute.project.route,
      task: taskChildren?.title,
    });
    setProjectLink({
      projectId: project?.projectId || 0,
      taskId: taskChildren?.taskId || 0,
    });
    return () => {
      setProjectRoute({
        project: '',
      });
    };
  }, [taskChildren]);

  return <BoardsContainerUI project={project} />;
};

export default SubTaskBoards;
