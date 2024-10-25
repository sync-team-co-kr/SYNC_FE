import { useEffect, useState } from 'react';

import fakeAvatar from '@assets/rectangle-50.png';
import search from '@assets/search.svg';
import RouteProjectDropdown from '@components/dropdown/RouteProjectDropdown';
import InviteProjectMemberModal from '@components/modal/InviteProjectMemberModal';
import { SettingsMemberItem } from '@components/settings';
import { AxiosResByData } from '@customTypes/common/AxiosRes';
import RawProject from '@customTypes/project/RawProject';
import useDropdown from '@hooks/useDropdown';
import useModal from '@hooks/useModal';
import { userApiInstance } from '@libs/axios/axios';
import { useGetProjectList } from '@services/project/Project.hooks';
import { AxiosResponse } from 'axios';

import {
  Content,
  Header,
  HeaderTail,
  InviteEmailButton,
  InviteLinkContainer,
  InviteLinkForm,
  InviteLinkHeader,
  MemberItemHeader,
  MemberList,
  MembersContainer,
  MembersHeader,
  ProjectListDropdown,
  SearchBar,
  SearchForm,
  SearchIcon,
  SelectedProject,
  TabMenuItem,
  TabMenuList,
  ToogleInviteCode,
} from './styles';

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

const MembersSettings = () => {
  const [openModal] = useModal();
  const [
    isOpenProjectListDropdown,
    toggleProjectListDropdown,
    projectDropdownRef,
  ] = useDropdown();

  const { projectListData, isLoading } = useGetProjectList();
  const [selectedProject, setSelectedProject] = useState<RawProject | null>(
    projectListData ? projectListData[0] : null,
  );
  const [inviteLink, setInviteLink] = useState('');

  const createInviteLink = async () => {
    if (selectedProject?.projectId) {
      const response: AxiosResponse<AxiosResByData<{ link: string }>> =
        await userApiInstance.get('/user/api/link', {
          params: {
            projectId: selectedProject?.projectId,
          },
        });
      setInviteLink(response.data.data.link);
    }
  };

  useEffect(
    () => projectListData && setSelectedProject(projectListData[0]),
    [isLoading],
  );

  useEffect(() => {
    createInviteLink();
  }, [selectedProject?.projectId]);

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
            projectList={projectListData}
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
            <input type="text" value={inviteLink} readOnly />
            <button
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText(inviteLink);
              }}
            >
              링크 복사
            </button>
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
                onClick={() =>
                  openModal(() =>
                    InviteProjectMemberModal({
                      project: {
                        title: selectedProject?.title || '',
                        projectId: selectedProject?.projectId || 0,
                      },
                    }),
                  )
                }
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
