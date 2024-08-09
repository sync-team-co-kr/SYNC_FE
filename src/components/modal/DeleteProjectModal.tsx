import React, { useState } from 'react';

import useProject from '@hooks/useProject';
import styled from 'styled-components';

const ModalHeader = styled.article`
  display: flex;
  flex-direction: column;
  gap: 15px;
  h2 {
    color: var(--main-black, #000);
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  p {
    color: var(--Alert-Color-Negative-Red, #ed6863);
    /* Paragraph */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
  }
`;

const Form = styled.form`
  width: 490px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
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

const ButtonList = styled.div`
  padding: 32px 0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Submit = styled.input`
  padding: 8px 24px;
  height: 42px;
  background: var(--Alert-Color-Negative-Red, #ed6863);
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  color: var(--Black-White-White, #fff);
  /* Heading 5 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px; /* 121.429% */
`;

const Cancel = styled.button`
  padding: 8px 24px;
  height: 42px;
  background: var(--Black-White-White, #fff);
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  color: var(--Black-White-Black-70, #636363);
  /* Heading 5 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px; /* 121.429% */
`;

interface DeleteProjectModalProps {
  projectId: number;
}

const DeleteProjectModal = ({ projectId }: DeleteProjectModalProps) => {
  const [retypeProjectTitle, setRetypeProjectTitle] = useState('');
  const { project, deleteProjectMutation } = useProject(projectId);

  const handleDeleteProject = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (retypeProjectTitle === project?.title) {
      deleteProjectMutation.mutate();
    }
  };

  return (
    <>
      <ModalHeader>
        <h2>프로젝트 삭제</h2>
        <p>
          프로젝트 삭제시 해당 내용을 복구할 수 없습니다. <br />
          프로젝트 담당자를 임명하고 탈퇴 시 남은 인원이 해당 데이터를 유지할 수
          있습니다.
        </p>
      </ModalHeader>

      <Form>
        <InputContainer>
          <p>프로젝트 명</p>
          <input
            type="text"
            value={project?.title}
            placeholder="프로젝트 1"
            readOnly
            disabled
          />
        </InputContainer>

        <InputContainer>
          <p>프로젝트 재입력</p>
          <input
            type="text"
            value={retypeProjectTitle}
            onChange={(e) => setRetypeProjectTitle(e.target.value)}
            placeholder="프로젝트 명을 그대로 입력해주세요."
          />
        </InputContainer>

        <ButtonList>
          <Cancel>취소</Cancel>
          <Submit
            type="submit"
            value="삭제하기"
            onClick={handleDeleteProject}
          />
        </ButtonList>
      </Form>
    </>
  );
};

export default DeleteProjectModal;
