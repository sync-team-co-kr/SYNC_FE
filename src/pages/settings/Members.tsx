import { useEffect, useState } from 'react';

import fakeAvatar from '@assets/rectangle-50.png';
import search from '@assets/search.svg';
import RouteProjectDropdown from '@components/dropdown/RouteProjectDropdown';
import InviteProjectMemberModal from '@components/modal/InviteProjectMemberModal';
import { SettingsMemberItem } from '@components/settings';
import useDropdown from '@hooks/useDropdown';
import useModal from '@hooks/useModal';
import useProjectList from '@hooks/useProjectList';
import { requiredJwtTokeninstance } from '@libs/axios/axios';
import { AxiosResponse } from 'axios';
import styled from 'styled-components';

const Header = styled.article`
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

const Content = styled.section`
  display: flex;
  flex-direction: column;
  gap: 45px;
`;

const ProjectListDropdown = styled.div`
  width: 300px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const SelectedProject = styled.div`
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

const InviteLinkContainer = styled.section`
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

const InviteLinkHeader = styled.div`
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

const ToogleInviteCode = styled.div`
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

const InviteLinkForm = styled.form`
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

const MembersContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const MembersHeader = styled.div`
  height: 38px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;

const TabMenuList = styled.ul`
  width: 236px;
  display: flex;
  gap: 8px;
`;

const TabMenuItem = styled.li`
  padding: 4px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const HeaderTail = styled.div`
  display: flex;
  align-items: center;
`;

const SearchForm = styled.form`
  margin-right: 16px;
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchBar = styled.input`
  width: 288px;
  height: 30px;
  padding: 4px 0 4px 45px;
  background: #fff;
  border: 1px solid var(--New-group-Gray, #d2dbe2);
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.img`
  position: absolute;
  left: 15px;
`;

const InviteEmailButton = styled.button`
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

const MemberList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const MemberItemHeader = styled.li`
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

const fakeMemberList = [
  {
    name: '김지용',
    email: 'Kimjiyong2523@gmail.com',
    job: '디자이너',
    role: '프로젝트 생성자',
  },
  {
    name: '최홍혁',
    email: 'Kimjiyong2523@gmail.com',
    job: '디자이너',
    role: '관리자',
  },
  {
    name: '이소정',
    email: 'Kimjiyong2523@gmail.com',
    job: '기획자',
    role: '팀원',
  },
  {
    name: '박승주',
    email: 'Kimjiyong2523@gmail.com',
    job: '개발자',
    role: '팀원',
  },
];

interface AxiosRes<ResponseType> {
  message: string;
  result: boolean;
  value: ResponseType;
}

export interface IProject {
  projectId: number;
  title: string;
  subTitle: string;
  description: string;
  startDate: Date;
  endDate: Date;
  memberIds: number[];
}

interface getProjectMembersResponse {
  projectId: number;
  userIds: number[];
}

interface getMemberRoleResponse {
  userId: number;
  projectId: number;
  isManager: number;
}

interface IUser {
  username: string;
  nickname?: string;
  position?: string;
  isManager: number;
}

interface IMember extends IUser {
  userId: number;
  username: string;
  nickname?: string;
  position?: string;
  isManager: number;
  projectId: number;
}

const MembersSettings = () => {
  const [openModal] = useModal();
  const [
    isOpenProjectListDropdown,
    toggleProjectListDropdown,
    projectDropdownRef,
  ] = useDropdown();

  const { projectList, isLoading } = useProjectList();
  const [selectedProject, setSelectedProject] = useState<IProject | null>(
    projectList ? projectList[0] : null,
  );
  const [members, setMembers] = useState<IMember[] | null>(null);

  useEffect(() => {
    const getProjectMembers = async () => {
      if (projectList) {
        try {
          // 프로젝트에 속한 멤버의 아이디 불러오기
          const project = selectedProject || projectList[0];
          const response: AxiosResponse<AxiosRes<getProjectMembersResponse[]>> =
            await requiredJwtTokeninstance.get(`/user/api/member/v2`, {
              params: {
                projectIds: [project.projectId].toString(),
              },
            });

          // 멤버의 권한 불러오기
          const { userIds } = response.data.value[0];
          const getMemberRoleRes: AxiosResponse<
            AxiosRes<getMemberRoleResponse[]>
          > = await requiredJwtTokeninstance.get('/user/api/member/v1', {
            params: {
              userIds: userIds.join(','),
            },
          });

          // 멤버의 회원 정보 불러오기
          const primaryKeyMemberList = getMemberRoleRes.data.value.filter(
            (value) => {
              const isEqualCurrentProject =
                project.projectId === value.projectId ? 'yes' : 'no';
              if (isEqualCurrentProject === 'yes') return true;
              return false;
            },
          );
          const getMembersData: IMember[] = await Promise.all(
            primaryKeyMemberList.map(async (value) => {
              const getMembersRes: AxiosResponse<AxiosRes<IUser[]>> =
                await requiredJwtTokeninstance.get('/user/api/info/v2', {
                  params: {
                    userIds: value.userId.toString(),
                  },
                });

              /* eslint-disable @typescript-eslint/no-unused-vars */
              const { isManager, ...memberInfo } = getMembersRes.data.value[0];
              return { ...value, ...memberInfo };
            }),
          );
          setMembers(getMembersData);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getProjectMembers();
  }, [isLoading]);

  console.log(members);

  return (
    <>
      <Header>
        <h1>주소록</h1>
        <p>해당 프로젝트의 멤버를 확인 및 역할을 수정할 수 있습니다.</p>
      </Header>
      <Content>
        <ProjectListDropdown ref={projectDropdownRef}>
          <SelectedProject onClick={toggleProjectListDropdown}>
            <img src={fakeAvatar} alt="프로젝트 이미지" />
            <span>{selectedProject?.title}</span>
          </SelectedProject>
          <RouteProjectDropdown
            isOpen={isOpenProjectListDropdown}
            toggleModal={toggleProjectListDropdown}
            projectList={projectList}
            setSelectedProject={setSelectedProject}
          />
        </ProjectListDropdown>

        <InviteLinkContainer>
          <h5>초대링크</h5>
          <InviteLinkHeader>
            <p>
              워크 스페이스 소유자와 멤버십 관리자가 새 멤버를 초대할 수 있도록
              비밀 링크를 활성화 하세요. <br /> 새로 링크를 생성할 수 있습니다.
            </p>
            <ToogleInviteCode>
              <div></div>
            </ToogleInviteCode>
          </InviteLinkHeader>
          <InviteLinkForm>
            <input
              type="text"
              value="https://dashlite.net/demo1/user-profile-regular.html"
              readOnly
            />
            <button>링크 복사</button>
          </InviteLinkForm>
        </InviteLinkContainer>

        <MembersContainer>
          <MembersHeader>
            <TabMenuList>
              <TabMenuItem>
                <span>멤버</span>
                <span>4</span>
              </TabMenuItem>
              <TabMenuItem>
                <span>게스트</span>
                <span>4</span>
              </TabMenuItem>
            </TabMenuList>

            <HeaderTail>
              <SearchForm>
                <SearchBar type="text" placeholder="Search" />
                <SearchIcon src={search} />
                <input type="submit" hidden />
              </SearchForm>

              <InviteEmailButton
                onClick={() => openModal(InviteProjectMemberModal)}
              >
                초대하기
              </InviteEmailButton>
            </HeaderTail>
          </MembersHeader>

          <MemberList>
            <MemberItemHeader>
              <h5>사용자</h5>
              <p>직무</p>
              <p>권한</p>
              <div>-</div>
            </MemberItemHeader>

            {fakeMemberList.map((member) => (
              <SettingsMemberItem key={member.name} {...member} />
            ))}
          </MemberList>
        </MembersContainer>
      </Content>
    </>
  );
};

export default MembersSettings;
