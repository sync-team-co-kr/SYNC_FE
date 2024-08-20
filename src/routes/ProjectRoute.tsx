import { Route, Routes } from 'react-router-dom';

import Project from '@pages/projects';
import ProjectBoards from '@pages/projects/ProjectBoards/ProjectBoards';
import ProjectList from '@pages/projects/ProjectList';
import ProjectWorkBoards from '@pages/projects/works/ProjectWorkBoards';

const ProjectRoute = () => (
  <Routes>
    <Route path="/" element={<Project />}>
      <Route index element={<ProjectBoards />} />
      <Route path="board" element={<ProjectBoards />} />
      <Route path="list" element={<ProjectList />} />
      <Route path="board/work" element={<ProjectWorkBoards />} />
    </Route>
  </Routes>
);
export default ProjectRoute;
