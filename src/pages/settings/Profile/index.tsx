import {
  Avatar,
  DeleteAccountButton,
  Header,
  ProfileInfoAnswer,
  ProfileInfoContainer,
  ProfileInfoLabel,
  ProfileInfoList,
} from './styles';

const ProfileSettings = () => {
  return (
    <>
      <Header>
        <h3>내 계정</h3>
        <p>개인 정보를 관리하고 다른 사용자가 볼 수 있는 정보를 제공합니다.</p>
      </Header>
      <ProfileInfoContainer>
        <h4>프로필 정보</h4>
        <ProfileInfoList>
          <li>
            <ProfileInfoLabel>프로필 사진</ProfileInfoLabel>
            <Avatar></Avatar>
          </li>
          <li>
            <ProfileInfoLabel>닉네임</ProfileInfoLabel>
            <ProfileInfoAnswer>김지용</ProfileInfoAnswer>
          </li>
          <li>
            <ProfileInfoLabel>직위</ProfileInfoLabel>
            <ProfileInfoAnswer>디자이너</ProfileInfoAnswer>
          </li>
          <li>
            <ProfileInfoLabel>소개</ProfileInfoLabel>
            <ProfileInfoAnswer>나를 소개해주세요.</ProfileInfoAnswer>
          </li>
        </ProfileInfoList>
      </ProfileInfoContainer>
      <ProfileInfoContainer>
        <h4>계정 정보</h4>
        <ProfileInfoList>
          <li>
            <ProfileInfoLabel>이메일 주소</ProfileInfoLabel>
            <ProfileInfoAnswer>jordanbelfort@naver.com</ProfileInfoAnswer>
          </li>
          <li>
            <ProfileInfoLabel>이름</ProfileInfoLabel>
            <ProfileInfoAnswer>김지용</ProfileInfoAnswer>
          </li>
        </ProfileInfoList>
      </ProfileInfoContainer>
      <DeleteAccountButton>계정 삭제</DeleteAccountButton>
    </>
  );
};

export default ProfileSettings;
