import { styled } from 'styled-components';
import { vars } from 'token';

const MemberItem = styled.li`
  width: 28px;
  height: 28px;
  padding: 5px 1px;
  background: ${vars.sementic.color.lightBlue};
  border-radius: 100%;
  font-size: 12px;
  font-weight: 700;
  color: ${vars.sementic.color.positiveBlue};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProjectMemberAvatar = ({ username }: { username: string }) => {
  return <MemberItem>{username?.substring(1)}</MemberItem>;
};

export default ProjectMemberAvatar;
