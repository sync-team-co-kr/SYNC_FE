import { useOutletContext } from 'react-router-dom';

import { SettingsMemberItem } from '@components/settings';
import { RawProject } from '@customTypes/project';

import { MemberItemHeader, MemberList } from './styles';

interface IMember {
  id: number;
  isManager: number;
  userId: string;
  username: string;
  nickname: string;
  position: string;
}

interface MemberListComponentProps {
  project: RawProject | null;
  members?: IMember[];
  role: 0;
}

const MemberListComponent = () => {
  const { project, members, role } =
    useOutletContext<MemberListComponentProps>();

  return (
    <MemberList>
      <MemberItemHeader>
        <h5>사용자</h5>
        <p>권한</p>
        <div></div>
      </MemberItemHeader>

      {members?.map((member) => (
        <SettingsMemberItem
          key={member.id}
          {...member}
          projectId={project?.projectId}
          myRole={role}
        />
      ))}
    </MemberList>
  );
};

export default MemberListComponent;
