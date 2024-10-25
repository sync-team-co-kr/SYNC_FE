import { styled } from 'styled-components';

export const Header = styled.article`
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  h1 {
    color: var(--main-black, #000);
    font-family: Pretendard;
    font-size: 40px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  p {
    color: var(--main-black, #000);
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  gap: 45px;
`;

export const ProjectListDropdown = styled.div`
  width: 300px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

export const SelectedProject = styled.div`
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  img {
    width: 32px;
    height: 32px;
    border-radius: 4px;
  }
`;

export const InviteLinkContainer = styled.section`
  display: flex;
  flex-direction: column;
  h5 {
    margin-bottom: 8px;
    color: var(--main-black, #000);
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 21px */
    letter-spacing: -0.266px;
  }
`;

export const InviteLinkHeader = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  p {
    color: var(--main-black, #000);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    letter-spacing: -0.228px;
  }
`;

export const ToogleInviteCode = styled.div`
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
    padding: 4px 8px;
    border: 1px solid var(--New-group-Gray, #d2dbe2);
    outline: none;
    color: var(--New-group-Gray, #d2dbe2);
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 21px */
    letter-spacing: -0.266px;
    display: flex;
    align-items: center;
  }
  button {
    width: 100px;
    padding: 4px 8px;
    background: #fff;
    border: 1px solid var(--main-black, #000);
    border-radius: 4px;
    color: var(--main-black, #000);
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 21px */
    letter-spacing: -0.266px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const MembersContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const MembersHeader = styled.div`
  height: 38px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;

export const TabMenuList = styled.ul`
  width: 236px;
  display: flex;
  gap: 8px;
`;

export const TabMenuItem = styled.li`
  padding: 4px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const HeaderTail = styled.div`
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
  width: 288px;
  height: 30px;
  padding: 4px 0 4px 45px;
  background: #fff;
  border: 1px solid var(--New-group-Gray, #d2dbe2);
  display: flex;
  align-items: center;
`;

export const SearchIcon = styled.img`
  position: absolute;
  left: 15px;
`;

export const InviteEmailButton = styled.button`
  padding: 4px 8px;
  background: #fff;
  border: 1px solid var(--main-black, #000);
  border-radius: 4px;
  color: var(--main-black, #000);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 21px */
  letter-spacing: -0.266px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MemberList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const MemberItemHeader = styled.li`
  width: 900px;
  display: flex;
  border-bottom: 1px solid black;
  h5 {
    width: 430px;
    padding: 8px;
    display: flex;
    align-items: center;
  }
  p {
    width: 154px;
    padding: 8px;
    display: flex;
    align-items: center;
  }
  div {
    width: 100px;
    padding: 8px;
    display: flex;
    align-items: center;
  }
`;
