/**
 * src/routes/SettingsRoute.tsx
 */
import { Route, Routes } from 'react-router-dom';

import Settings from '@pages/Settings';
import AlarmSettings from '@pages/Settings/Alarm';
import MembersSettings from '@pages/Settings/Members';
import ProjectSettings from '@pages/Settings/Project';

const SettingsRoute = () => (
  <Routes>
    <Route path="/" element={<Settings />}>
      <Route index element={<ProjectSettings />} />
      <Route path="project" element={<ProjectSettings />} />
      <Route path="members" element={<MembersSettings />} />
      <Route path="alarm" element={<AlarmSettings />} />
    </Route>
  </Routes>
);
export default SettingsRoute;
