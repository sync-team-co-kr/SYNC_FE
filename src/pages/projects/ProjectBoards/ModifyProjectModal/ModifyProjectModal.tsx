import React, { useEffect, useState } from 'react';

import CancelButton from '@assets/cancel-x.svg';
import { Button } from '@components/common/Button';
import InputArea from '@components/common/InputArea';
import InputWithCalendarArea from '@components/common/InputArea/InputWithCalendar';
import InputWithIconArea from '@components/common/InputArea/InputWithIconArea';
import useModal from '@hooks/useModal';
import { useEditProject, useGetProject } from '@services/project/Project.hooks';

import StyleModifyProjectModal from './ModifyProjectModal.style';

interface ModifyProjectModalProps {
  projectId: number;
}

function ModifyProjectModal({ projectId }: ModifyProjectModalProps) {
  const [closeModal] = useModal();

  const { projectData, isLoading } = useGetProject(projectId);
  const { editProjectMutate } = useEditProject();

  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [description, setDescription] = useState(
    projectData?.description || '',
  );

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // 리렌더링 개선 예정
  useEffect(() => {
    if (projectData) {
      setTitle(projectData.title);
      setSubTitle(projectData.subTitle);
      setDescription(projectData.description);
      setStartDate(new Date(projectData.startDate));
      setEndDate(new Date(projectData.endDate));
    }
  }, [isLoading]);

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

  if (isLoading) return <></>;
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
