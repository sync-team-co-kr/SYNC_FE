/**
 * src/routes/SettingsRoute.tsx
 */
import { Route, Routes } from 'react-router-dom';

import Settings from '@pages/settings';
import MembersSettings from '@pages/settings/Members';
import GuestList from '@pages/settings/Members/GuestList';
import MemberListComponent from '@pages/settings/Members/MemberList';
import ProfileSettings from '@pages/settings/Profile';
import ProjectSettings from '@pages/settings/Project';

const SettingsRoute = () => (
  <Routes>
    <Route path="/" element={<Settings />}>
      <Route index element={<ProjectSettings />} />
      <Route path="profile" element={<ProfileSettings />} />
      <Route path="project" element={<ProjectSettings />} />
      <Route path="members" element={<MembersSettings />}>
        <Route path="member" element={<MemberListComponent />} />
        <Route path="guest" element={<GuestList />} />
      </Route>
    </Route>
  </Routes>
);
export default SettingsRoute;
