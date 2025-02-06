import { styled } from 'styled-components';
import { vars } from 'token';

export const CreateProjectModalForm = styled.form`
  width: 472px;
  background: ${vars.sementic.color.white};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  input {
    padding: 12px 8px;
    border: 1px solid var(--Black-White-Black-20, #bfbfbf);
    border-radius: 4px;
    color: var(--Black-White-Black-70, #636363);
    /* Paragraph */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const SubmitWrapper = styled.div`
  padding: 32px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
`;
