import styled from 'styled-components';

const Form = styled.form`
  width: 490px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  p {
    color: #a6b3be;
    font-feature-settings:
      'clig' off,
      'liga' off;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 12px; /* 85.714% */
  }
  input[type='text'] {
    padding: 16px;
    border: 1px solid var(--input-stroke, #d2dbe2);
    border-radius: 4px;
    display: flex;
    align-items: center;
    &::placeholder {
      color: #a6b3be;
      font-feature-settings:
        'clig' off,
        'liga' off;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 12px; /* 85.714% */
    }
  }
`;

const Submit = styled.input`
  padding: 24px 77px;
  background: var(--New-group-Gray, #d2dbe2);
  border: 1px solid var(--New-group-Gray, #d2dbe2);
  border-radius: 12px;
  color: #343434;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function DeleteAccountModal() {
  return (
    <Form>
      <InputContainer>
        <p>현재 프로젝트</p>
        <input type="text" placeholder="프로젝트 1" />
        <input type="text" placeholder="프로젝트 2" />
        <input type="text" placeholder="프로젝트 3" />
        <input type="text" placeholder="프로젝트 4" />
      </InputContainer>

      <InputContainer>
        <p>현재 이메일</p>
        <input type="text" placeholder="kimjiyong2523@gmail.com" />
      </InputContainer>

      <Submit type="submit" value="이메일 인증 보내기" />
    </Form>
  );
}
