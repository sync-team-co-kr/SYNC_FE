import { useEffect, useState } from 'react';

import { ReactComponent as ArrowBottom } from '@assets/common/arrow/arrow-bottom.svg';
import fakeAvatar from '@assets/rectangle-50.png';
import search from '@assets/search.svg';
import { ReactComponent as InviteSVG } from '@assets/settings/invite.svg';
import RouteProjectDropdown from '@components/dropdown/RouteProjectDropdown';
import InviteProjectMemberModal from '@components/modal/InviteProjectMemberModal';
import { SettingsMemberItem } from '@components/settings';
import { AxiosResByData } from '@customTypes/common/AxiosRes';
import RawProject from '@customTypes/project/RawProject';
import useDropdown from '@hooks/useDropdown';
import useModal from '@hooks/useModal';
import { userApiInstance } from '@libs/axios/axios';
import { useGetProjectMembers } from '@services/member/Member.hooks';
import { useGetProjectList } from '@services/project/Project.hooks';
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
  ToggleInviteCode,
} from './styles';

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

  useEffect(
    () => projectListData && setSelectedProject(projectListData[0]),
    [isLoading],
  );

  useEffect(() => {
    createInviteLink();
  }, [selectedProject?.projectId]);

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
            <InviteLinkDescription>
              <p>
                초대 코드를 통해서 프로젝트에 새로운 인원을 초대할 수 있습니다.
              </p>
              <a>링크 초기화</a>
            </InviteLinkDescription>
            <ToggleInviteCode>
              <div></div>
            </ToggleInviteCode>
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
                <SearchBar type="text" placeholder="검색" />
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
                <InviteSVG />
                <span>초대하기</span>
              </InviteEmailButton>
            </HeaderTail>
          </MembersHeader>

          <MemberList>
            <MemberItemHeader>
              <h5>사용자</h5>
              <p>권한</p>
              <div></div>
            </MemberItemHeader>

            {getMembersData?.map((member) => (
              <SettingsMemberItem
                key={member.id}
                {...member}
                projectId={selectedProject?.projectId}
                myRole={myRole}
              />
            ))}
          </MemberList>
        </MembersContainer>
      </Content>
    </>
  );
};

export default MembersSettings;
