import React, { useState } from 'react';

import CancelButton from '@assets/cancel-x.svg';
import InputArea from '@components/common/InputArea';
import InputWithCalendarArea from '@components/common/InputArea/InputWithCalendar';
import InputWithIconArea from '@components/common/InputArea/InputWithIconArea';
import Toggle from '@components/common/Toggle/Toggle';
import { setIsModalOpen } from '@hooks/useModal';
import { useCreateProject } from '@services/project/Project.hooks';

import StyleCreateProjectModal from './CreateProjectModal.style';

/** 추후 swagger에 정의된 타입으로 변경 */
export interface ICreateProjectRequest {
  title: string;
  subTitle: string;
  description: string;
}

function CreateProjectModal({ closeModal }: { closeModal?: setIsModalOpen }) {
  /*
    const [newProject, setNewProject] = useState<ICreateProjectRequest>({
    title: '',
    subTitle: '',
    description: '',
  });
  */
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [active, setActive] = useState(false);
  const { createProjectMutate } = useCreateProject();

  const handleCreateProject = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();

    createProjectMutate({
      title,
      subTitle,
      description,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    });
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

        <StyleCreateProjectModal.InputArea>
          <StyleCreateProjectModal.ToggleArea>
            <label>일정</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>시간 포함</span>
              <Toggle
                isActive={active}
                toggleSwtich={() => setActive((prevState) => !prevState)}
              />
            </div>
          </StyleCreateProjectModal.ToggleArea>

          <StyleCreateProjectModal.InputWithCalendarArea>
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
