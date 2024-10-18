import { IMember } from '@customTypes/member';
import { styled } from 'styled-components';
import { vars } from 'token';

const AvatarWrapper = styled.li`
  width: 32px;
  height: 32px;
  background: ${vars.sementic.color.black35};
  border-radius: 100%;
  border: 2px solid ${vars.sementic.color.black35};
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: ${vars.sementic.typography['small-text']};
  }
`;

const Avatar = ({ member }: { member: IMember }) => {
  return (
    <AvatarWrapper>
      <span>{member.username.substring(1)}</span>
    </AvatarWrapper>
  );
};

export default Avatar;
