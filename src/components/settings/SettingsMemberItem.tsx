import { ReactComponent as ArrowBottom } from '@assets/common/arrow/arrow-bottom.svg';
import { ReactComponent as MeatballMenu } from '@assets/meatballs.svg';
import SettingsMember from '@components/dropdown/SettingsMemberDropdown';
import SettingsRole from '@components/dropdown/settingsRoleDropdown';
import useDropdown from '@hooks/useDropdown';
import styled from 'styled-components';
import { vars } from 'token';

const MemberItem = styled.li`
  width: 900px;
  border-bottom: 1px solid ${vars.sementic.color.black70};
  display: flex;
  & > * {
    padding: 12px 16px;
    display: flex;
    align-items: center;
    position: relative;
  }
`;

const Profile = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  background: ${vars.sementic.color
    .black35}; // 유저의 프로필 or 기본 프로필로 변경
  border: 2px solid ${vars.sementic.color.white};
  border-radius: 100%;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  span:first-child {
    font-size: ${vars.sementic.typography['heading-4']};
    font-weight: 700;
    color: ${vars.sementic.color.black};
  }
  span:last-child {
    font-size: ${vars.sementic.typography['small-text-b']};
    font-weight: 700;
    color: ${vars.sementic.color.black35};
  }
`;

const Role = styled.div`
  width: calc(100% - 60% - 44px);
  gap: 8px;
  button {
    padding: 15px 0;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: ${vars.sementic.typography.paragraph};
    font-weight: 500;
    color: ${vars.sementic.color.black};
    cursor: pointer;
  }
`;

const More = styled.div`
  width: 44px;
  padding: 12px 16px;
  button {
    padding: 15px 0;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: ${vars.sementic.typography.paragraph};
    font-weight: 500;
    color: ${vars.sementic.color.black};
    cursor: pointer;
  }
`;

interface Member {
  name: string;
  email: string;
  role: string;
}

export default function SettingsMemberItem({ name, email, role }: Member) {
  const [
    isOpenSelectRoleDropdown,
    toggleSelectRoleDropdown,
    selectRoleDropdownRef,
  ] = useDropdown();
  const [isOpenMemberDropdown, toggleMemberDropdown, memberDropdownRef] =
    useDropdown();

  return (
    <MemberItem>
      <Profile>
        <Avatar></Avatar>
        <UserInfo>
          <span>{name}</span>
          <span>{email}</span>
        </UserInfo>
      </Profile>
      <Role ref={selectRoleDropdownRef}>
        <button onClick={toggleSelectRoleDropdown}>{role}</button>
        <ArrowBottom />
        <SettingsRole isOpen={isOpenSelectRoleDropdown} />
      </Role>
      <More ref={memberDropdownRef}>
        <button onClick={toggleMemberDropdown}>
          <MeatballMenu />
        </button>
        <SettingsMember isOpen={isOpenMemberDropdown} />
      </More>
    </MemberItem>
  );
}
