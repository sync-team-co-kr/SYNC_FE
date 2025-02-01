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
import {
  CreateProjectModalForm,
  CreateProjectModalHeader,
  InputWrapper,
  SubmitWrapper,
} from '@pages/projects/components/CreateProjectModal/styles';
import { useEditProject, useGetProject } from '@services/project/Project.hooks';
import isStartDateExceedsEndDate from '@utils/project/validateProject';

interface ModifyProjectModalProps {
  projectId: number;
}

function ModifyProjectModal({ projectId }: ModifyProjectModalProps) {
  const [closeModal] = useModal();

  const { project, isLoading } = useGetProject(projectId);
  const { editProjectMutate } = useEditProject();

  const {
    payload,
    payload: { title, subTitle, description, startDate, endDate },
  } = useProjectState();
  const {
    setProject,
    setTitle,
    setSubTitle,
    setDescription,
    setStartDate,
    setEndDate,
  } = useProjectActions();

  useEffect(() => {
    if (project && !isLoading) {
      setProject({
        ...project,
      });
    }
  }, [isLoading]);

  const handleModifyProject = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isStartDateExceedsEndDate(startDate, endDate)) {
      editProjectMutate({ ...payload, projectId });
    }
  };

  if (isLoading) return <></>;
  return (
    <>
      <CreateProjectModalHeader>
        <h1>프로젝트 설정</h1>
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
            onClick={() => closeModal(ModifyProjectModal)}
            text="취소"
          />
          <Button
            size="medium"
            variant="fill"
            $hasIcon={false}
            onClick={handleModifyProject}
            text="완료"
          />
        </SubmitWrapper>
      </CreateProjectModalForm>
    </>
  );
}

export default ModifyProjectModal;
