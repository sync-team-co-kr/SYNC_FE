import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useBreadCrumbActions } from '@libs/store/breadcrumb/breadcrumb';
import { useDraggingTempTaskActions } from '@libs/store/task/draggingTempTask';
import { useGetProject } from '@services/project/Project.hooks';
import { useGetTasks } from '@services/task';

import BoardsContainerUI from './BoardsContainerUI';

const TaskBoards = () => {
  const { projectId } = useParams();

  const { tasks, isFetching } = useGetTasks(Number(projectId));
  const { project } = useGetProject(Number(projectId));

  const { setOriginalTasks } = useDraggingTempTaskActions();
  const { setProjectRoute, setProjectLink } = useBreadCrumbActions();

  useEffect(() => {
    if (project)
      setProjectRoute({
        project: project.title,
      });
    setProjectLink({
      projectId: project?.projectId || 0,
    });
    return () => {
      setProjectRoute({
        project: '',
      });
    };
  }, [project]);

  useEffect(() => {
    if (tasks) {
      setOriginalTasks(tasks);
    }
  }, [isFetching]);

  return <BoardsContainerUI project={project} />;
};

export default TaskBoards;
