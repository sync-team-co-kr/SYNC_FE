import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ReactComponent as PasswordSVG } from '@assets/lock-01.svg';
import { ReactComponent as MailSVG } from '@assets/mail-01.svg';
import { userApiInstance } from '@libs/axios/axios';
import { loginAPI } from '@services/api';
import { AxiosError } from 'axios';
import { styled } from 'styled-components';
import Cookies from 'universal-cookie';

const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.section`
  width: 460px;
  padding: 50px 40px;
  border-radius: 12px;
  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 10);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  width: 100%;
  margin-bottom: 20px;
  color: #1f2937;
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
`;

const Form = styled.form`
  width: 100%;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 54px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    position: absolute;
    left: 16px;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  padding-left: 48px;
  border-radius: 4px;
  border: 1px solid var(--input-stroke, #d2dbe2);
  &::placeholder {
    font-size: 14px;
  }
`;

const StaySignInWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  label {
    font-size: 12px;
    color: #434d5b;
  }
`;

const StaySigninCheckbox = styled.input`
  width: 18px;
  height: 18px;
  margin-right: 8px;
`;

const Submit = styled.input`
  width: 100%;
  height: 56px;
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.1) 100%
    ),
    #d2d2d2;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginLinks = styled.ul`
  width: 100%;
  display: flex;
`;

const LoginLink = styled.li`
  width: 33.3%;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:before {
    content: '';
  }
  &:after {
    content: '|';
  }
  &:last-child {
    &:after {
      content: '';
    }
  }
`;

const DEFAULT_ERROR_MESSAGE = {
  userId: '',
  password: '',
};

const LoginDevelopment = () => {
  const [loginForm, setLoginForm] = useState({
    userId: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState({
    userId: '',
    password: '',
  });
  const navigate = useNavigate();

  const validateLoginForm = () => {
    const passwordRegExp = /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{8,16}/;

    const { userId, password } = loginForm;
    let loginErrorMessage = { ...DEFAULT_ERROR_MESSAGE };

    if (userId.length <= 7 || userId.length >= 18)
      loginErrorMessage = {
        ...loginErrorMessage,
        userId: '아이디는 8자 이상 ~ 16자 이하의 길이를 입력해야 합니다.',
      };
    if (!password.match(passwordRegExp))
      loginErrorMessage = {
        ...loginErrorMessage,
        password: '비밀번호가 정규식에 해당하지 않습니다.',
      };
    if (password.length <= 7 || password.length >= 17)
      loginErrorMessage = {
        ...loginErrorMessage,
        password: '비밀번호는 8자 이상 ~ 16자 이하의 길이를 입력해야 합니다.',
      };

    if (
      Object.entries(DEFAULT_ERROR_MESSAGE).toString() !==
      Object.entries(loginErrorMessage).toString()
    ) {
      console.log(loginErrorMessage);
      setErrorMessage({ ...loginErrorMessage });
      return false;
    }
    setErrorMessage({ ...DEFAULT_ERROR_MESSAGE });
    return true;
  };

  // todo return 값이 통일 되야아함
  // eslint-disable-next-line consistent-return
  // tanstack-query로 개선
  const handleLogin = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const isValidatePass = validateLoginForm();
    if (!isValidatePass) return false;

    try {
      const loginResponse = await loginAPI({ ...loginForm });
      if (loginResponse.result === 'OK') {
        localStorage.setItem('loggedUserId', loginForm.userId);

        const cookies = new Cookies(null, { path: '/' });
        const inviteCode = cookies.get('invite-code');

        if (inviteCode) {
          await userApiInstance.post(
            `/user/api/invite`,
            { token: inviteCode },
            {
              withCredentials: true,
            },
          );

          cookies.remove('invite-code');
        }

        navigate('/');
        return true;
      }
      return false;
    } catch (error) {
      if (
        error instanceof AxiosError<{ message: string; code: string }> &&
        error.response
      ) {
        const axiosError: AxiosError<{ message: string; code: string }> = error;
        if (axiosError.response?.data.message === '아이디가 잘못되었습니다.')
          setErrorMessage({
            ...errorMessage,
            userId: '아이디 또는 비밀번호가 옳지 않습니다.',
          });
        if (axiosError.response?.data.code === 'M001') return true;
      }
      console.error(error);
      return false;
    }
  };

  return (
    <Main>
      <Wrapper>
        <Title>로그인</Title>
        <Form>
          <InputWrapper>
            <MailSVG />
            <Input
              type="text"
              value={loginForm.userId}
              onChange={(e) =>
                setLoginForm({ ...loginForm, userId: e.target.value })
              }
              placeholder="이메일을 입력해주세요"
            />
          </InputWrapper>

          <InputWrapper>
            <PasswordSVG />
            <Input
              type="password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
              placeholder="비밀번호를 입력해주세요"
            />
          </InputWrapper>

          <StaySignInWrapper>
            <StaySigninCheckbox id="stay-sign-in" type="checkbox" />
            <label htmlFor="stay-sign-in">로그인 상태 유지하기</label>
          </StaySignInWrapper>

          <Submit type="submit" value="로그인" onClick={handleLogin} />
        </Form>

        <LoginLinks>
          <LoginLink>아이디 찾기</LoginLink>
          <LoginLink>비밀번호 찾기</LoginLink>
          <LoginLink>
            <Link to="/signup">회원가입</Link>
          </LoginLink>
        </LoginLinks>
      </Wrapper>
    </Main>
  );
};

export default LoginDevelopment;
