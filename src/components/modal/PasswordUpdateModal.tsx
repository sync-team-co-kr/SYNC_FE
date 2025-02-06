import styled from 'styled-components';

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const InputContainer = styled.div`
  width: 490px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const Label = styled.label`
  height: 12px;
  color: #a6b3be;
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px; /* 85.714% */
`;

const Input = styled.input`
  border: 1px solid var(--input-stroke, #d2dbe2);
  border-radius: 4px;
  padding: 16px;
  display: flex;
  align-items: center;
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

export default function PasswordUpdateModal() {
  return (
    <>
      <Form>
        <InputContainer>
          <Label>현재 비밀번호</Label>
          <Input type="password" placeholder="23412" />
        </InputContainer>

        <InputContainer>
          <Label>새 비밀번호</Label>
          <Input type="password" placeholder="12341234" />
        </InputContainer>

        <InputContainer>
          <Label>새 비밀번호 확인</Label>
          <Input type="password" placeholder="12341234" />
        </InputContainer>

        <Submit type="submit" value="비밀번호 변경" />
      </Form>
    </>
  );
}
