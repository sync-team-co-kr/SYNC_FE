// 업무 생성 모달 내 form
import { ChangeEvent, useState } from 'react';

import { ReactComponent as CloseX } from '@assets/cancel-x.svg';
import { Editor } from '@components/Editor';
import { Button } from '@components/common/Button';
import InputWithCalendarArea from '@components/common/InputArea/InputWithCalendar';
import InputWithTimePicker from '@components/common/InputArea/InputWithTimePicker';
import { LabelContainer } from '@components/common/Select/style';
import Textfield from '@components/common/Textfield';
import Toggle from '@components/common/Toggle/Toggle';
import { Typography } from '@components/common/Typography';
import { modalStore } from '@libs/store';
import { useTaskActions, useTaskState } from '@libs/store/task/task';
import StyleCreateProjectModal from '@pages/projects/components/CreateProjectModal/CreateProjectModal.style';
import { CreateTaskPayload } from '@services/swagger/output/data-contracts';
import { useCreateTask } from '@services/task/Task.hooks';
import {
  addDays,
  getDay,
  getHours,
  setHours,
  setMinutes,
  subHours,
} from 'date-fns';

import ParentTaskSelectList from './ParentTaskSelectList';
import ProjectSelectDropdown from './ProjectSelectDropdown';
import StatusSelectDropdown from './StatusSelectDropdown';
import TaskManagerSelectDropdown from './TaskManagerSelectDropdown';
import TaskParentIdSetButtonGroup from './TaskParentIdSetButtonGroup';
import {
  Container,
  ContainerContent,
  ContainerFooter,
  ContainerHeader,
  SectionContainer,
} from './style';

// 시간 포함 여부에 따라 날짜와 시간을 합치는 함수
function combineDateTime(date: Date): string {
  try {
    const koreanStandardDate =
      getDay(subHours(date, 9)) !== getDay(date) ? addDays(date, 1) : date;

    const datePart = new Date(koreanStandardDate).toISOString().split('T')[0];
    const hour = String(new Date(date).getHours()).padStart(2, '0');
    const minute = String(new Date(date).getMinutes()).padStart(2, '0');

    const combined = new Date(`${datePart}T${hour}:${minute}:00`);

    return combined.toISOString();
  } catch (error) {
    console.error(error);
    throw new Error('날짜와 시간을 합치는데 실패했습니다.');
  }
}

// 업무 생성 모달
export const CreateTaskModal = () => {
  const { closeModal } = modalStore();

  // 업무 생성 모달 payload 값들을 가져오는 state
  const { payload, errorList, titleImage } = useTaskState();

  // 업무 생성 모달 payload 값들을 set 해주는 actions
  const {
    setTitle,
    setDescription,
    setStartDate,
    setEndDate,
    setTitleImage,
    resetPayload,
    removeErrorList,
    clearErrorList,
  } = useTaskActions();

  const [includeTime, setIncludeTime] = useState(false);

  const { createTaskMutate } = useCreateTask();

  const handleCloseModal = () => {
    closeModal();

    resetPayload();
    clearErrorList();
  };

  const handleCreateTask = () => {
    // 필수 입력값 체크
    if (payload.title === '') {
      errorList.push('title');
    }

    if (payload.projectId === 0) {
      errorList.push('projectId');
    }
    console.log(errorList);
    if (errorList.length > 0) {
      alert('필수 입력값을 입력해주세요');
      return;
    }

    const taskData: CreateTaskPayload['data'] = {
      projectId: payload.projectId,
      title: payload.title,
      description: payload.description,
      parentTaskId: payload.parentTaskId,
      thumbnailIcon: titleImage?.startsWith('blob') ? '' : titleImage,
      status: payload.status,
    };

    if (payload.startDate && payload.endDate) {
      taskData.startDate = includeTime
        ? combineDateTime(payload.startDate!)
        : new Date(payload.startDate!).toISOString();

      taskData.endDate = includeTime
        ? combineDateTime(payload.endDate!)
        : setHours(
            setMinutes(new Date(payload.endDate!), 59),
            23,
          ).toISOString();
    }

    createTaskMutate({
      data: {
        ...taskData,
      },
      images: [],
      thumbnailImage: titleImage?.startsWith('blob') ? titleImage : '',
    });
  };
  // date
  const handleChangeDate = (date: Date, type: 'startDate' | 'endDate') => {
    if (type === 'startDate') {
      setStartDate(date);
    }
    if (type === 'endDate') {
      setEndDate(date);
    }
  };

  // validate

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);

    if (errorList.includes('title')) {
      removeErrorList('title');
    }
  };

  return (
    <Container>
      <ContainerHeader>
        <Typography variant="heading-3" color="black">
          업무 생성
        </Typography>
        <Button
          $hasIcon
          $renderIcon={<CloseX width={24} height={24} />}
          onClick={handleCloseModal}
          size="small"
          variant="text"
        />
      </ContainerHeader>
      <ContainerContent>
        {/* project name */}
        <SectionContainer>
          <ProjectSelectDropdown />
        </SectionContainer>
        {/* project name end */}
        {/* task state */}
        <SectionContainer>
          <TaskParentIdSetButtonGroup />
        </SectionContainer>
        {/* task state end */}

        {/* task */}
        <ParentTaskSelectList parentTaskId={payload.parentTaskId} />
        {/* task end */}

        {/* icon & task name */}
        <SectionContainer>
          <LabelContainer>
            <Typography variant="small-text-b" color="negativeRed">
              *
            </Typography>
            <Typography variant="small-text-b" color="black35">
              아이콘 & 업무명
            </Typography>
          </LabelContainer>
          <Textfield
            selectIcon
            selectIconOnClick={(icon) => setTitleImage(icon as string)}
            selectIconValue={titleImage}
            variant="outlined"
            placeholder="업무명을 입력해주세요"
            value={payload.title}
            onChange={(e) => handleTitleChange(e)}
          />
        </SectionContainer>
        {/* icon & task end */}

        {/* date */}
        <SectionContainer maxWidth="500px">
          <StyleCreateProjectModal.InputArea>
            <StyleCreateProjectModal.ToggleArea>
              <label>일정</label>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <span>시간 포함</span>
                <Toggle
                  isActive={includeTime}
                  toggleSwtich={() => setIncludeTime((prevState) => !prevState)}
                />
              </div>
            </StyleCreateProjectModal.ToggleArea>

            <StyleCreateProjectModal.InputWithCalendarArea>
              <InputWithCalendarArea
                value={payload.startDate}
                setDate={(date) => handleChangeDate(date as Date, 'startDate')}
                placeholderText="프로젝트 시작 날짜"
              />

              <StyleCreateProjectModal.CrossDash></StyleCreateProjectModal.CrossDash>
              <InputWithCalendarArea
                value={payload.endDate}
                setDate={(date) => handleChangeDate(date as Date, 'endDate')}
                placeholderText="프로젝트 종료 날짜"
              />
            </StyleCreateProjectModal.InputWithCalendarArea>

            <StyleCreateProjectModal.InputWithCalendarArea>
              <InputWithTimePicker
                date={payload.startDate}
                setDate={setStartDate}
                placeholderText="프로젝트 시작 시간"
                isDisabled={!includeTime}
              />
              <StyleCreateProjectModal.CrossDash></StyleCreateProjectModal.CrossDash>
              <InputWithTimePicker
                date={payload.endDate}
                setDate={setEndDate}
                placeholderText="프로젝트 종료 시간"
                isDisabled={!includeTime}
              />
            </StyleCreateProjectModal.InputWithCalendarArea>
          </StyleCreateProjectModal.InputArea>
        </SectionContainer>
        {/* date end */}

        {/* description */}
        <SectionContainer maxWidth="100%">
          <LabelContainer>
            <Typography variant="small-text-b" color="black35">
              설명
            </Typography>
          </LabelContainer>
          <Editor
            value={payload.description}
            placeholder="프로젝트 부제목을 입력해주세요"
            onChangeText={(text) => setDescription(text)}
          />
        </SectionContainer>
        {/* description end */}

        {/*  status */}
        <SectionContainer>
          <StatusSelectDropdown />
        </SectionContainer>
        {/* status end */}

        {/* owner */}
        <SectionContainer>
          <TaskManagerSelectDropdown />
        </SectionContainer>
      </ContainerContent>
      <ContainerFooter>
        <Button variant="text" size="medium" text="취소" onClick={closeModal} />
        <Button
          variant="fill"
          size="medium"
          text="저장"
          onClick={handleCreateTask}
        />
      </ContainerFooter>
    </Container>
  );
};
