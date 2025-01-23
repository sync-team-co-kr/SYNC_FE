import React, { useEffect, useState } from 'react';

import CancelButton from '@assets/cancel-x.svg';
import { Button } from '@components/common/Button';
import InputArea from '@components/common/InputArea';
import InputWithCalendarArea from '@components/common/InputArea/InputWithCalendar';
import InputWithIconArea from '@components/common/InputArea/InputWithIconArea';
import InputWithTimePicker from '@components/common/InputArea/InputWithTimePicker';
import Toggle from '@components/common/Toggle/Toggle';
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

  const [includeTime, setIncludeTime] = useState(false);
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
      const projectStartDate = includeTime
        ? startDate.toISOString()
        : convertSharp(startDate).toISOString();
      const projectEndDate = includeTime
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
          labelText="커버 & 프로젝트 명"
          placeholderText="제목"
        />

        <InputArea
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          labelText="부제목"
          placeholderText="부제목"
        />

        <InputArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          labelText="프로젝트 설명"
          placeholderText="프로젝트 설명"
        />

        <StyleCreateProjectModal.InputArea>
          <StyleCreateProjectModal.ToggleArea>
            <label>일정</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>시간 포함</span>
              <Toggle
                isActive={includeTime}
                toggleSwtich={() => setIncludeTime((prevState) => !prevState)}
              />
            </div>
          </StyleCreateProjectModal.ToggleArea>

          <StyleCreateProjectModal.InputWithCalendarArea>
            <InputWithCalendarArea
              value={startDate}
              setDate={setStartDate}
              placeholderText="프로젝트 시작 날짜"
            />

            <StyleCreateProjectModal.CrossDash></StyleCreateProjectModal.CrossDash>
            <InputWithCalendarArea
              value={endDate}
              setDate={setEndDate}
              placeholderText="프로젝트 종료 날짜"
            />
          </StyleCreateProjectModal.InputWithCalendarArea>

          <StyleCreateProjectModal.InputWithCalendarArea>
            <InputWithTimePicker
              date={startDate}
              setDate={setStartDate}
              placeholderText="프로젝트 시작 시간"
              isDisabled={!includeTime}
            />
            <StyleCreateProjectModal.CrossDash></StyleCreateProjectModal.CrossDash>
            <InputWithTimePicker
              date={endDate}
              setDate={setEndDate}
              placeholderText="프로젝트 시작 시간"
              isDisabled={!includeTime}
            />
          </StyleCreateProjectModal.InputWithCalendarArea>
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
