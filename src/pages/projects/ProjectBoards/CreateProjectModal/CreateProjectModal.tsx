import React, { useState } from 'react';

import CancelButton from '@assets/cancel-x.svg';
import ProjectProfile from '@assets/project-profile.png';
import { setIsModalOpen } from '@hooks/useModal';
import { useCreateProject } from '@services/project/Project.hooks';

import StyleCreateProjectModal from './CreateProjectModal.style';
import InputWithCalendar from './InputWithCaelndar';

/** 추후 swagger에 정의된 타입으로 변경 */
export interface ICreateProjectRequest {
  title: string;
  subTitle: string;
  description: string;
}

function CreateProjectModal({ closeModal }: { closeModal?: setIsModalOpen }) {
  const [newProject, setNewProject] = useState<ICreateProjectRequest>({
    title: '',
    subTitle: '',
    description: '',
  });
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const { createProjectMutate } = useCreateProject();

  const handleCreateProject = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();

    createProjectMutate({
      ...newProject,
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
        {/* InputArea 공통 컴포넌트로 분리 */}
        <StyleCreateProjectModal.InputArea>
          <label>커버 & 프로젝트 명</label>
          <StyleCreateProjectModal.InputWithCover>
            <img src={ProjectProfile} alt="프로젝트 프로필" />
            <input
              type="text"
              value={newProject.title}
              onChange={(e) =>
                setNewProject({ ...newProject, title: e.target.value })
              }
              placeholder="제목"
            />
          </StyleCreateProjectModal.InputWithCover>
        </StyleCreateProjectModal.InputArea>

        <StyleCreateProjectModal.InputArea>
          <label>부제목</label>
          <input
            type="text"
            value={newProject.subTitle}
            onChange={(e) =>
              setNewProject({ ...newProject, subTitle: e.target.value })
            }
            placeholder="부제목"
          />
        </StyleCreateProjectModal.InputArea>

        <StyleCreateProjectModal.InputArea>
          <label>프로젝트 설명</label>
          <input
            type="text"
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
            placeholder="프로젝트 설명"
          />
        </StyleCreateProjectModal.InputArea>

        <StyleCreateProjectModal.InputArea>
          <StyleCreateProjectModal.ToggleArea>
            <label>일정</label>
            <div>
              <span></span>
              <div>토글</div>
            </div>
          </StyleCreateProjectModal.ToggleArea>

          <StyleCreateProjectModal.InputWithCalendarArea>
            <InputWithCalendar date={startDate} setDate={setStartDate} />

            <div></div>
            <InputWithCalendar date={endDate} setDate={setEndDate} />
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
