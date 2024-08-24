import React, { useState } from 'react';

import CancelButton from '@assets/cancel-x.svg';
import InputArea from '@components/common/InputArea';
import InputWithCalendarArea from '@components/common/InputArea/InputWithCalendar';
import InputWithIconArea from '@components/common/InputArea/InputWithIconArea';
import useModal from '@hooks/useModal';
import { useEditProject } from '@services/project/Project.hooks';
import styled from 'styled-components';

const ModifyProjectModalHeader = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  h1 {
    color: var(--main-black, #000);
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  button {
    background-color: transparent;
    border: none;
  }
`;

const Form = styled.form`
  width: 472px;
  background: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex-shrink: 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  label {
    color: var(--Black-White-Black-35, #8f8f8f);
    /* Small Text_B */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 14px; /* 116.667% */
  }
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

const LabelWithToggle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  div {
    font-size: 12px;
  }
`;

const InputWithProjectPeriod = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  align-self: stretch;
  label {
    flex-grow: 1;
  }
`;

const Submit = styled.div`
  padding: 32px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  * {
    height: 42px;
    padding: 8px 24px;
    background: var(--Black-White-White, #fff);

    color: var(--Black-White-Black-70, #636363);
    /* Heading 5 */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 17px; /* 121.429% */

    border: none;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  input[type='submit'] {
    background: var(--Primary-Orange-Yellow-Orange, #ffd880);
  }
`;

export interface IProject {
  projectId: number;
  title: string;
  subTitle: string;
  description: string;
  startDate: Date;
  endDate: Date;
  memberIds: number[];
}

interface ModifyProjectModalProps {
  projectId: number;
}

function ModifyProjectModal({ projectId }: ModifyProjectModalProps) {
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [closeModal] = useModal();

  const { editProjectMutate } = useEditProject();

  const handleModifyProject = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();

    editProjectMutate({
      projectId,
      title,
      subTitle,
      description,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    });
  };

  return (
    <>
      <ModifyProjectModalHeader>
        <h1>프로젝트 설정</h1>
        <button>
          <img src={CancelButton} alt="닫기" />
        </button>
      </ModifyProjectModalHeader>

      <Form>
        <InputWithIconArea
          value={title}
          setValue={setTitle}
          labelText="커버 & 프로젝트 명"
          placeholderText="제목"
        />

        <InputArea
          value={subTitle}
          setValue={setSubTitle}
          labelText="부제목"
          placeholderText="부제목"
        />

        <InputArea
          value={description}
          setValue={setDescription}
          labelText="프로젝트 설명"
          placeholderText="프로젝트 설명"
        />

        <InputContainer>
          <LabelWithToggle>
            <label>일정</label>
            <div>
              <span></span>
              <div>토글</div>
            </div>
          </LabelWithToggle>

          <InputWithProjectPeriod>
            <InputWithCalendarArea
              value={startDate}
              setValue={setStartDate}
              placeholderText="프로젝트 시작 날짜"
            />

            <div
              style={{
                width: '10px',
                height: '1px',
                backgroundColor: '#bfbfbf',
              }}
            ></div>
            <InputWithCalendarArea
              value={endDate}
              setValue={setEndDate}
              placeholderText="프로젝트 종료 날짜"
            />
          </InputWithProjectPeriod>
        </InputContainer>

        <Submit>
          <button onClick={() => closeModal(ModifyProjectModal)}>취소</button>
          <input type="submit" value="완료" onClick={handleModifyProject} />
        </Submit>
      </Form>
    </>
  );
}

export default ModifyProjectModal;
