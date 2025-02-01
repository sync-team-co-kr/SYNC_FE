import React, { useEffect } from 'react';

import CancelButton from '@assets/cancel-x.svg';
import ScheduleRegistForm from '@components/Organism/ScheduleRegistForm';
import { Button } from '@components/common/Button';
import InputArea from '@components/common/InputArea';
import InputWithIconArea from '@components/common/InputArea/InputWithIconArea';
import Label from '@components/common/Label';
import useModal from '@hooks/useModal';
import {
  useProjectActions,
  useProjectState,
} from '@libs/store/project/project';
import { useCreateProject } from '@services/project/Project.hooks';
import isStartDateExceedsEndDate from '@utils/project/validateProject';

import {
  CreateProjectModalForm,
  CreateProjectModalHeader,
  InputWrapper,
  SubmitWrapper,
} from './styles';

function CreateProjectModal() {
  const [closeModal] = useModal();

  const {
    payload,
    payload: { title, subTitle, description, startDate, endDate },
  } = useProjectState();
  const {
    setTitle,
    setSubTitle,
    setDescription,
    setStartDate,
    setEndDate,
    clearProject,
  } = useProjectActions();

  const { createProjectMutate } = useCreateProject();

  useEffect(() => {
    clearProject();
  }, []);

  const handleCreateProject = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isStartDateExceedsEndDate(startDate, endDate)) {
      createProjectMutate(payload);
    }
  };

  return (
    <>
      <CreateProjectModalHeader>
        <h1>프로젝트 추가</h1>
        <button>
          <img src={CancelButton} alt="닫기" />
        </button>
      </CreateProjectModalHeader>

      <CreateProjectModalForm>
        <InputWithIconArea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          labelFC={
            <Label text="커버 & 프로젝트 명" id="title" isRequired={true} />
          }
          placeholderText="제목"
        />

        <InputArea
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          labelFC={<Label text="부제목" id="subTitle" isRequired={true} />}
          placeholderText="부제목"
        />

        <InputArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          labelFC={
            <Label text="프로젝트 설명" id="description" isRequired={true} />
          }
          placeholderText="프로젝트 설명"
        />

        <InputWrapper>
          <ScheduleRegistForm
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </InputWrapper>

        <SubmitWrapper>
          <Button
            size="medium"
            variant="text"
            $hasIcon={false}
            onClick={() => closeModal(CreateProjectModal)}
            text="취소"
          />
          <Button
            size="medium"
            variant="fill"
            $hasIcon={false}
            onClick={handleCreateProject}
            text="완료"
          />
        </SubmitWrapper>
      </CreateProjectModalForm>
    </>
  );
}

export default CreateProjectModal;
