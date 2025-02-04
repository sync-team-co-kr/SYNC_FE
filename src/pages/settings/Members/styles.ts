import { styled } from 'styled-components';
import { vars } from 'token';

export const Header = styled.article`
  display: flex;
  flex-direction: column;
  gap: 4px;
  h1 {
    font-size: ${vars.sementic.typography['heading-3']};
    font-weight: 700;
    color: ${vars.sementic.color.black};
  }
  p {
    font-size: ${vars.sementic.typography.paragraph};
    font-weight: 500;
    color: ${vars.sementic.color.black70};
  }
`;

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ProjectListDropdown = styled.div`
  width: 300px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const SelectedProject = styled.div`
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  article {
    display: flex;
    flex-direction: column;
    gap: 8px;
    h5 {
      font-size: 14px;
      font-weight: 700;
      color: ${vars.sementic.color.black};
    }
    span {
      font-size: 12px;
      font-weight: 700;
      color: ${vars.sementic.color.black70};
    }
  }
  img {
    width: 32px;
    height: 32px;
    border-radius: 4px;
  }
`;

export const InviteLinkContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4px;
  h5 {
    font-size: ${vars.sementic.typography.paragraph};
    font-weight: 700;
    color: ${vars.sementic.color.black};
  }
`;

export const InviteLinkHeader = styled.div`
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
`;

export const InviteLinkDescription = styled.article`
  display: flex;
  gap: 12px;
  p {
    font-size: ${vars.sementic.typography['small-text']};
    color: ${vars.sementic.color.black70};
  }
  a {
    font-size: ${vars.sementic.typography['small-text']};
    color: ${vars.sementic.color.positiveBlue};
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const ToggleInviteCode = styled.div`
  width: 56px;
  padding: 4px;
  border-radius: 100px;
  background-color: #4880ff;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  div {
    width: 24px;
    height: 24px;
    background-color: #fff;
    border-radius: 100px;
    position: absolute;
    right: 4px;
  }
`;

export const InviteLinkForm = styled.form`
  display: flex;
  justify-content: space-between;
  input[type='text'] {
    width: 60%;
    padding: 8px 24px;
    border: 1px solid ${vars.sementic.color.black10};
    border-radius: 8px;
    outline: none;
    font-size: ${vars.sementic.typography.paragraph};
    color: ${vars.sementic.color.black70};
    font-weight: 700;
    display: flex;
    align-items: center;
  }
  button {
    padding: 8px 24px;
    background-color: ${vars.sementic.color.white};
    border: 1px solid ${vars.sementic.color.black10};
    border-radius: 8px;
    font-size: ${vars.sementic.typography.paragraph};
    font-weight: 700;
    color: ${vars.sementic.color.black70};

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const MembersContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MembersHeader = styled.div`
  height: 52px;
  border-bottom: 1px solid ${vars.sementic.color.black10};
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const TabMenuList = styled.ul`
  width: 236px;
  display: flex;
  gap: 12px;
`;

export const TabMenuItem = styled.li`
  padding: 8px 24px;
  display: flex;
  gap: 8px;
  border-bottom: ${false
    ? vars.sementic.color.primaryOrange
    : vars.sementic.color.black10};
`;

export const HeaderTail = styled.div`
  height: 100%;
  padding: 8px 0;
  display: flex;
  align-items: center;
`;

export const SearchForm = styled.form`
  margin-right: 16px;
  display: flex;
  align-items: center;
  position: relative;
`;

export const SearchBar = styled.input`
  width: 222px;
  height: 100%;
  padding: 8px 12px;
  background: #fff;
  border: 1px solid var(--New-group-Gray, #d2dbe2);
  display: flex;
  align-items: center;
`;

export const SearchIcon = styled.img`
  position: absolute;
  right: 15px;
`;

export const InviteEmailButton = styled.button`
  height: 100%;
  padding: 8px 24px;
  background: ${vars.sementic.color.primaryOrange};
  border: none;
  border-radius: 8px;
  font-size: ${vars.sementic.typography.paragraph};
  font-weight: 700;
  color: ${vars.sementic.color.black};
  display: flex;
  gap: 12px;
`;

export const MemberList = styled.ul`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const MemberItemHeader = styled.li`
  width: 900px;
  display: flex;
  border-bottom: 1px solid ${vars.sementic.color.black10};
  & > * {
    padding: 12px 16px;
    font-size: ${vars.sementic.typography['heading-5']};
    font-weight: 700;
    color: ${vars.sementic.color.black20};
    display: flex;
    align-items: center;
  }
  h5 {
    width: 60%;
  }
  p {
    width: calc(100% - 60% - 44px);
  }
  div {
    width: 44px;
  }
`;
