import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { ReactComponent as ArrowBottom } from '@assets/common/arrow/arrow-bottom.svg';
import fakeAvatar from '@assets/rectangle-50.png';
import search from '@assets/search.svg';
import { ReactComponent as InviteSVG } from '@assets/settings/invite.svg';
import TabMenu from '@components/TabMenu/TabMenu';
import ProjectNavigation from '@components/dropdown/ProjectNavigationDropdown';
import InviteProjectMemberModal from '@components/modal/InviteProjectMemberModal';
import { AxiosResByData } from '@customTypes/common/AxiosRes';
import RawProject from '@customTypes/project/RawProject';
import useDropdown from '@hooks/useDropdown';
import { userApiInstance } from '@libs/axios/axios';
import { modalStore } from '@libs/store';
import { useGetProjectMembers } from '@services/member/Member.hooks';
import { useGetProjects } from '@services/project/Project.hooks';
import { AxiosResponse } from 'axios';

import {
  Content,
  Header,
  HeaderTail,
  InviteEmailButton,
  InviteLinkContainer,
  InviteLinkDescription,
  InviteLinkForm,
  InviteLinkHeader,
  MembersContainer,
  MembersHeader,
  ProjectListDropdown,
  SearchBar,
  SearchForm,
  SearchIcon,
  SelectedProject,
} from './styles';

const memberSettingsTabMenuList = [
  {
    route: '/settings/members/member',
    tabMenuName: '멤버',
  },
  {
    route: '/settings/members/guest',
    tabMenuName: '게스트',
  },
];

const MembersSettings = () => {
  const { openModal } = modalStore();
  const [
    isOpenProjectNavigation,
    toggleProjectListDropdown,
    projectDropdownRef,
  ] = useDropdown();

  const { projects, isLoading } = useGetProjects();
  const [selectedProject, setSelectedProject] = useState<RawProject | null>(
    projects ? projects[0] : null,
  );

  const { getMembersData } = useGetProjectMembers(
    selectedProject?.projectId || 0,
  );

  const [inviteLink, setInviteLink] = useState('');
  const [myRole, setMyRole] = useState(0);

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

  useEffect(() => projects && setSelectedProject(projects[0]), [isLoading]);

  useEffect(() => {
    createInviteLink();
  }, [selectedProject?.projectId]);

  const handleSelectProjectNavigationItem = (project: RawProject) => {
    setSelectedProject(project);
    toggleProjectListDropdown();
  };
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedUserId') as string;
    const myMemberInfo = getMembersData?.filter(
      (member) => member.userId === loggedInUser,
    );
    if (myMemberInfo) {
      setMyRole(myMemberInfo[0].isManager);
    }
  }, [getMembersData]);

  return (
    <>
      <Header>
        <h1>사용자 관리</h1>
        <p>해당 프로젝트의 멤버를 확인 및 역할을 수정할 수 있습니다.</p>
      </Header>
      <Content>
        <ProjectListDropdown ref={projectDropdownRef}>
          <SelectedProject onClick={toggleProjectListDropdown}>
            <img src={fakeAvatar} alt="프로젝트 이미지" />
            <article>
              <h5>{selectedProject?.title}</h5>
              <span>{selectedProject?.subTitle}</span>
            </article>
            <ArrowBottom />
          </SelectedProject>
          <ProjectNavigation
            isOpen={isOpenProjectNavigation}
            projects={projects}
            handleSelectNavigationItem={handleSelectProjectNavigationItem}
          />
        </ProjectListDropdown>

        <InviteLinkContainer>
          <h5>초대링크</h5>
          <InviteLinkHeader>
            <InviteLinkDescription>
              <p>
                초대 코드를 통해서 프로젝트에 새로운 인원을 초대할 수 있습니다.
              </p>
              <a>링크 초기화</a>
            </InviteLinkDescription>
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
            <TabMenu tabMenuList={memberSettingsTabMenuList} />

            <HeaderTail>
              <SearchForm>
                <SearchBar type="text" placeholder="검색" />
                <SearchIcon src={search} />
                <input type="submit" hidden />
              </SearchForm>

              <InviteEmailButton
                onClick={() =>
                  openModal(
                    () =>
                      InviteProjectMemberModal({
                        project: {
                          title: selectedProject?.title || '',
                          projectId: selectedProject?.projectId || 0,
                        },
                      }),
                    '멤버 초대',
                  )
                }
              >
                <InviteSVG />
                <span>초대하기</span>
              </InviteEmailButton>
            </HeaderTail>
          </MembersHeader>

          <Outlet
            context={{
              project: selectedProject,
              members: getMembersData,
              role: myRole,
            }}
          />
        </MembersContainer>
      </Content>
    </>
  );
};

export default MembersSettings;
