import { MemberItemHeader, MemberList } from './styles';

const GuestListComponent = () => {
  return (
    <MemberList>
      <MemberItemHeader>
        <h5>사용자</h5>
        <p>권한</p>
        <div></div>
      </MemberItemHeader>

      {/* 게스트 기능 추가될 때 게스트 목록 삽입하기 */}
    </MemberList>
  );
};

export default GuestListComponent;
