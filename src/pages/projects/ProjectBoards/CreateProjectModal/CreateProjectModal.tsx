import React, { useEffect, useState } from 'react';

import CancelButton from '@assets/cancel-x.svg';
import InputArea from '@components/common/InputArea';
import InputWithCalendarArea from '@components/common/InputArea/InputWithCalendar';
import InputWithIconArea from '@components/common/InputArea/InputWithIconArea';
import InputWithTimePicker from '@components/common/InputArea/InputWithTimePicker';
import Toggle from '@components/common/Toggle/Toggle';
import { setIsModalOpen } from '@hooks/useModal';
import {
  useProjectActions,
  useProjectState,
} from '@libs/store/project/project';
import { useCreateProject } from '@services/project/Project.hooks';
import { CreateProjectRequestDto } from '@services/swagger/output/data-contracts';
import { add, isBefore } from 'date-fns';

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

function CreateProjectModal({ closeModal }: { closeModal?: setIsModalOpen }) {
  const { title, subTitle, description, startDate, endDate } =
    useProjectState();
  const {
    setTitle,
    setSubTitle,
    setDescription,
    setStartDate,
    setEndDate,
    clearProject,
  } = useProjectActions();

  const [startTime, setStartTime] = useState<ProjectPeriodTime>({
    hour: null,
    minute: null,
  });
  const [endTime, setEndTime] = useState<ProjectPeriodTime>({
    hour: null,
    minute: null,
  });

  const [includeTime, setIncludeTime] = useState(false);
  const { createProjectMutate } = useCreateProject();

  useEffect(() => {
    clearProject();
  }, []);

  const requestCreateProject = (newProject: CreateProjectRequestDto) =>
    createProjectMutate(newProject);

  const ValidateProject = (newProject: CreateProjectRequestDto) => {
    const { startDate: projectStartDate, endDate: projectEndDate } = newProject;
    if (
      projectStartDate &&
      projectEndDate &&
      isBefore(projectStartDate, projectEndDate)
    ) {
      requestCreateProject(newProject);
    }
  };

  const handleCreateProject = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (startDate && endDate) {
      if (includeTime) {
        const projectStartDate = add(new Date(startDate), {
          hours: startTime.hour ? startTime.hour + 9 : 0,
          minutes: startTime.minute || 0,
        });

        const projectEndDate = add(new Date(endDate), {
          hours: endTime.hour ? endTime.hour + 9 : 0,
          minutes: endTime.minute || 0,
        });

        ValidateProject({
          title,
          subTitle,
          description,
          startDate: projectStartDate.toISOString(),
          endDate: projectEndDate.toISOString(),
        });
      } else
        ValidateProject({
          title,
          subTitle,
          description,
          startDate: startDate?.toISOString(),
          endDate: endDate?.toISOString(),
        });
    }
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
              value={startTime}
              setValue={setStartTime}
              placeholderText="프로젝트 시작 시간"
              isDisabled={!includeTime}
            />
            <StyleCreateProjectModal.CrossDash></StyleCreateProjectModal.CrossDash>
            <InputWithTimePicker
              value={endTime}
              setValue={setEndTime}
              placeholderText="프로젝트 시작 시간"
              isDisabled={!includeTime}
            />
          </StyleCreateProjectModal.InputWithCalendarArea>
        </StyleCreateProjectModal.InputArea>

        <StyleCreateProjectModal.Submit>
          <button onClick={closeModal}>취소</button>
          <input type="submit" value="추가하기" onClick={handleCreateProject} />
        </StyleCreateProjectModal.Submit>
      </StyleCreateProjectModal.Form>
    </>
  );
}

export default CreateProjectModal;
