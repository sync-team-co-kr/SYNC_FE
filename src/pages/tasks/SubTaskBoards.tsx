import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useBreadCrumbActions } from '@libs/store/breadcrumb/breadcrumb';
import { useDraggingTempTaskActions } from '@libs/store/task/draggingTempTask';
import { useGetProject } from '@services/project/Project.hooks';
import { useGetTaskChildren } from '@services/task/Task.hooks';

import BoardsContainerUI from './BoardsContainerUI';

const SubTaskBoards = () => {
  const { projectId, taskId } = useParams();

  const { project } = useGetProject(Number(projectId));
  const { taskChildren, isFetching } = useGetTaskChildren(Number(taskId));

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
  }, [isFetching]);

  return <BoardsContainerUI project={project} />;
};

export default SubTaskBoards;
