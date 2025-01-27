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
import convertSharp from '@utils/date/convertSharp';
import isStartDateExceedsEndDate from '@utils/project/validateProject';

import StyleCreateProjectModal from './CreateProjectModal.style';

/** 추후 swagger에 정의된 타입으로 변경 */
export interface ICreateProjectRequest {
  title: string;
  subTitle: string;
  description: string;
}

export interface ProjectPeriodTime {
  hour: number | null;
  minute: number | null;
}

interface Temp {
  title: string;
  thumbnail?: string | Blob;
  thumbnailType?: 'N' | 'I' | 'C' | 'E';
  subTitle: string;
  description: string;
  startDate?: string;
  endDate: string;
  task?: {
    totalCount: number;
    completedCount: number;
  };
}

function CreateProjectModal() {
  const [closeModal] = useModal();

  const { title, thumbnail, subTitle, description, startDate, endDate } =
    useProjectState();
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

  const requestCreateProject = (newProject: Temp) =>
    createProjectMutate(newProject);

  const handleCreateProject = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newProject = {
      title,
      thumbnail,
      subTitle,
      description,
    };
    if (
      startDate &&
      endDate &&
      !isStartDateExceedsEndDate(startDate, endDate)
    ) {
      const projectStartDate =
        startDate.getTime() % (60 * 60 * 24) === 0
          ? startDate.toISOString()
          : convertSharp(startDate).toISOString();
      const projectEndDate =
        endDate.getTime() % (60 * 60 * 24) === 0
          ? endDate.toISOString()
          : convertSharp(endDate).toISOString();

      requestCreateProject({
        ...newProject,
        startDate: projectStartDate,
        endDate: projectEndDate,
        thumbnail: thumbnail.value,
        thumbnailType: thumbnail.type,
      });
    }
    /*
    프로젝트 기간이 required인 이슈가 해결될 때
    기간이 빠진 new Project 서버에 보내는 함수 작성 예정
    */
  };

  return (
    <>
      <StyleCreateProjectModal.Header>
        <h1>프로젝트 추가</h1>
        <button>
          <img src={CancelButton} alt="닫기" />
        </button>
      </StyleCreateProjectModal.Header>

      <StyleCreateProjectModal.Form>
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

        <StyleCreateProjectModal.InputArea>
          <ScheduleRegistForm
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </StyleCreateProjectModal.InputArea>

        <StyleCreateProjectModal.Submit>
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
        </StyleCreateProjectModal.Submit>
      </StyleCreateProjectModal.Form>
    </>
  );
}

export default CreateProjectModal;
