import { Link } from 'react-router-dom';

import { ReactComponent as MemberSVG } from '@assets/settings/members.svg';
import { ReactComponent as ProjectSVG } from '@assets/settings/projects.svg';
import { ReactComponent as MyProfileSVG } from '@assets/settings/users.svg';
import styled from 'styled-components';
import { vars } from 'token';

const Wrapper = styled.ul<{ $isOpen: boolean }>`
  width: 250px;
  background: #fff;
  border: 1px solid #b8b8b8;
  border-radius: 8px;
  box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.3);
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  left: calc(-250px + 100%);
  bottom: calc(-217px - 50%);
  z-index: 50;
`;

const ConfigItem = styled.li`
  padding: 16px;
  border-bottom: 1px solid #b8b8b8;
  display: flex;
  gap: 12px;
  &:hover {
    background-color: ${vars.sementic.color.black10};
  }
  &:hover:not(:first-child) {
    background-color: white;
  }
  h4 {
    ${vars.sementic.typography['heading-4']}
    color: ${vars.sementic.color.black};
  }
  span {
    ${vars.sementic.typography.paragraph};
    color: ${vars.sementic.color.black};
  }
`;

export default function ConfigDropDown({ isOpen }: { isOpen: boolean }) {
  return (
    <>
      <Wrapper $isOpen={isOpen}>
        <ConfigItem>
          <h4>설정</h4>
        </ConfigItem>
        <Link to="/settings/profile">
          <ConfigItem>
            <MyProfileSVG />
            <span>내 계정</span>
          </ConfigItem>
        </Link>

        <Link to="/settings/project">
          <ConfigItem>
            <ProjectSVG />
            <span>프로젝트 설정</span>
          </ConfigItem>
        </Link>

        <Link to="/settings/members">
          <ConfigItem>
            <MemberSVG />
            <span>사용자 관리</span>
          </ConfigItem>
        </Link>
      </Wrapper>
    </>
  );
}
