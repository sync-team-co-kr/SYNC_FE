import { Route, Routes } from 'react-router-dom';

import Project from '@pages/projects';
import ProjectBoards from '@pages/projects/board';
import ProjectList from '@pages/projects/list';
import ProjectWorkBoards from '@pages/tasks';

const ProjectRoute = () => (
  <Routes>
    <Route path="/" element={<Project />}>
      <Route index element={<ProjectBoards />} />
      <Route path="board" element={<ProjectBoards />} />
      <Route path="list" element={<ProjectList />} />
      <Route path=":id" element={<ProjectWorkBoards />} />
    </Route>
  </Routes>
);
export default ProjectRoute;
