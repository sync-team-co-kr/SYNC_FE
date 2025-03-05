import { useNavigate } from 'react-router-dom';

import { ReactComponent as RepresentImg } from '@assets/represent/represent-img.svg';
import { ReactComponent as NaverLogo } from '@assets/social/naver-logo.svg';
import { styled } from 'styled-components';
import { vars } from 'token';

const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.section`
  width: 396px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

const IntroContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const RepresentImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  h2 {
    font-size: 30px;
    font-weight: 700;
    color: ${vars.sementic.color.primaryOrange};
  }
`;

const Introduction = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  h1 {
    ${vars.sementic.typography['heading-1']};
    color: ${vars.sementic.color.black};
  }
  h4 {
    ${vars.sementic.typography['heading-4']};
    color: ${vars.sementic.color.black70};
  }
`;

const NaverLoginButton = styled.div`
  padding: 16px 149px 16px 24px;
  border: 1px solid ${vars.sementic.color.black35};
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 95px;
  cursor: pointer;
  transition: border ease-in-out 0.6s;
  &:hover {
    border: 1px solid ${vars.sementic.color.lightGreen};
  }
  p {
    ${vars.sementic.typography.paragraph}
  }
`;

const LoginProduction = () => {
  const navigate = useNavigate();

  const naverLogin = async () => {
    navigate('https://view.sync-team.co.kr:8443/oauth2/authorization/naver');
  };

  return (
    <Main>
      <LoginContainer>
        <IntroContainer>
          <RepresentImageWrapper>
            <RepresentImg />
            <h2>SYNC</h2>
          </RepresentImageWrapper>
          <Introduction>
            <h1>SYNC 시작하기</h1>
            <h4>새로운 방식의 업무 일정 관리 협업 서비스</h4>
          </Introduction>
        </IntroContainer>
        <NaverLoginButton onClick={naverLogin}>
          <NaverLogo />
          <p>네이버 로그인</p>
        </NaverLoginButton>
      </LoginContainer>
    </Main>
  );
};

export default LoginProduction;
