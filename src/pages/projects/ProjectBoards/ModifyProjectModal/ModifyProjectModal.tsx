import React, { useEffect } from 'react';

import CancelButton from '@assets/cancel-x.svg';
import { Button } from '@components/common/Button';
import InputArea from '@components/common/InputArea';
import InputWithCalendarArea from '@components/common/InputArea/InputWithCalendar';
import InputWithIconArea from '@components/common/InputArea/InputWithIconArea';
import useModal from '@hooks/useModal';
import {
  useProjectActions,
  useProjectStore,
} from '@libs/store/project/project';
import { useEditProject, useGetProject } from '@services/project/Project.hooks';

import StyleModifyProjectModal from './ModifyProjectModal.style';

interface ModifyProjectModalProps {
  projectId: number;
}

function ModifyProjectModal({ projectId }: ModifyProjectModalProps) {
  const [closeModal] = useModal();

  const { projectData, isFetching } = useGetProject(projectId);
  const { editProjectMutate } = useEditProject();

  const { title, subTitle, description, startDate, endDate } =
    useProjectStore();
  const {
    setProject,
    setTitle,
    setSubTitle,
    setDescription,
    setStartDate,
    setEndDate,
  } = useProjectActions();

  useEffect(() => {
    projectData && setProject(projectData);
  }, [isFetching]);

  const handleModifyProject = (e: React.MouseEvent<HTMLButtonElement>) => {
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

  if (isFetching || !projectData) return <></>;
  return (
    <>
      <StyleModifyProjectModal.Header>
        <h1>프로젝트 설정</h1>
        <button>
          <img src={CancelButton} alt="닫기" />
        </button>
      </StyleModifyProjectModal.Header>

      <StyleModifyProjectModal.Form>
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

        <StyleModifyProjectModal.InputArea>
          <StyleModifyProjectModal.ToggleArea>
            <label>일정</label>
            <div>
              <span></span>
              <div>토글</div>
            </div>
          </StyleModifyProjectModal.ToggleArea>

          <StyleModifyProjectModal.CalendarArea>
            <InputWithCalendarArea
              value={startDate}
              setDate={setStartDate}
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
              setDate={setEndDate}
              placeholderText="프로젝트 종료 날짜"
            />
          </StyleModifyProjectModal.CalendarArea>
        </StyleModifyProjectModal.InputArea>

        <StyleModifyProjectModal.Submit>
          <Button
            size="medium"
            variant="text"
            hasIcon={false}
            onClick={() => closeModal(ModifyProjectModal)}
            text="취소"
          />
          <Button
            size="medium"
            variant="fill"
            hasIcon={false}
            onClick={handleModifyProject}
            text="완료"
          />
        </StyleModifyProjectModal.Submit>
      </StyleModifyProjectModal.Form>
    </>
  );
}

export default ModifyProjectModal;
