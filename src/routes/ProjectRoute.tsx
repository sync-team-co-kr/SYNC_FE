import { Route, Routes } from 'react-router-dom';

import Project from '@pages/projects';
import ProjectBoards from '@pages/projects/board';
import ProjectList from '@pages/projects/list';
import QuestBoards from '@pages/tasks/QuestBoards';
import SubTaskBoards from '@pages/tasks/SubTaskBoards';
import TaskBoards from '@pages/tasks/TaskBoards';

const ProjectRoute = () => (
  <Routes>
    <Route path="/" element={<Project />}>
      <Route index element={<ProjectBoards />} />
      <Route path="board" element={<ProjectBoards />} />
      <Route path="list" element={<ProjectList />} />
      <Route path=":projectId" element={<TaskBoards />} />
      <Route path=":projectId/tasks/:taskId" element={<SubTaskBoards />} />
      <Route path=":projectId/subTasks/:taskId" element={<QuestBoards />} />
    </Route>
  </Routes>
);
export default ProjectRoute;
