// 업무 생성 모달 내 form
import { ChangeEvent, useEffect, useState } from 'react';

import { ReactComponent as CloseX } from '@assets/cancel-x.svg';
import { Editor } from '@components/Editor';
import { Button } from '@components/common/Button';
import InputWithCalendarArea from '@components/common/InputArea/InputWithCalendar';
import InputWithTimePicker from '@components/common/InputArea/InputWithTimePicker';
import { Select } from '@components/common/Select/Select';
import { SelectButton } from '@components/common/Select/Select.Button';
import { SelectItem, SelectList } from '@components/common/Select/Select.list';
import { searchFilter } from '@components/common/Select/Select.utils';
import { LabelContainer, TaskContainer } from '@components/common/Select/style';
import { Tag } from '@components/common/Tag';
import { SituationProperty } from '@components/common/Tag/types';
import Textfield from '@components/common/Textfield';
import Toggle from '@components/common/Toggle/Toggle';
import { Typography } from '@components/common/Typography';
import { modalStore } from '@libs/store';
import { useTaskActions, useTaskState } from '@libs/store/task/task';
import StyleCreateProjectModal from '@pages/projects/ProjectBoards/CreateProjectModal/CreateProjectModal.style';
import { useGetProjectList } from '@services/project/Project.hooks';
import { CreateTaskPayload } from '@services/swagger/output/data-contracts';
import { useCreateTask } from '@services/task/Task.hooks';

import { SELECT_STATUS } from './constants';
import {
  ButtonGroup,
  Container,
  ContainerContent,
  ContainerFooter,
  ContainerHeader,
  SectionContainer,
} from './style';

// 시간 포함 여부에 따라 날짜와 시간을 합치는 함수
function combineDateTime(date: string): string {
  try {
    const datePart = new Date(date).toISOString().split('T')[0];
    const hour = String(new Date(date).getHours()).padStart(2, '0');
    const minute = String(new Date(date).getMinutes()).padStart(2, '0');

    const combined = new Date(`${datePart}T${hour}:${minute}:00Z`);

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
  const { payload, project, errorList, titleImage } = useTaskState();

  // 업무 생성 모달 payload 값들을 set 해주는 actions
  const {
    setProject,
    setTitle,
    setStatus,
    setDescription,
    setParentTaskId,
    setProjectId,
    setStartDate,
    setEndDate,
    setTitleImage,
    resetPayload,
    removeErrorList,
    clearErrorList,
  } = useTaskActions();

  // projectData를 가져오는 hooks

  const [includeTime, setIncludeTime] = useState(false);
  const { projectListData } = useGetProjectList() ?? {};

  // 프로젝트 검색 state
  const [projectSearch, setProjectSearch] = useState('');
  // 검색 필터링된 프로젝트 리스트
  const [projectList, setProjectList] = useState(projectListData);

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
        : new Date(payload.startDate!).toISOString().split('T')[0];

      taskData.endDate = includeTime
        ? combineDateTime(payload.endDate!)
        : new Date(payload.endDate!).toISOString().split('T')[0];
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

  // 프로젝트 검색

  const handleProjectSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectSearch(e.target.value);
    setProjectList(searchFilter(e.target.value, projectListData));
  };

  // validate

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);

    if (errorList.includes('title')) {
      removeErrorList('title');
    }
  };

  useEffect(() => {
    setProjectList(projectListData);
  }, [projectListData]);

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
          <LabelContainer>
            <Typography variant="small-text-b" color="negativeRed">
              *
            </Typography>
            <Typography variant="small-text-b" color="black35">
              프로젝트 명
            </Typography>
          </LabelContainer>
          <Select
            listLabel="프로젝트"
            isEssential
            value={
              project.title !== '' ? project.title : '프로젝트를 선택해 주세요'
            }
            type="select"
          >
            <SelectButton />
            <SelectList>
              <Textfield
                variant="search"
                type="search"
                placeholder="검색"
                value={projectSearch}
                onChange={handleProjectSearch}
              />
              {projectList?.map((projectData) => (
                <SelectItem
                  onClick={() => {
                    setProject(projectData);
                    setProjectId(projectData.projectId);
                  }}
                  key={projectData.projectId}
                >
                  <Typography variant="paragraph" color="black70">
                    {projectData.title}
                  </Typography>
                </SelectItem>
              ))}
            </SelectList>
          </Select>
          {/* project name end */}
        </SectionContainer>
        {/* task state */}
        <SectionContainer>
          <LabelContainer>
            <Typography variant="small-text-b" color="negativeRed">
              *
            </Typography>
            <Typography variant="small-text-b" color="black35">
              업무 속성
            </Typography>
          </LabelContainer>
          <ButtonGroup>
            <Button
              size="small"
              $isSelect={payload.parentTaskId === 0}
              variant="task"
              text="테스크"
              onClick={() => {
                setParentTaskId(0);
              }}
            />
            <Button
              size="small"
              variant="subTask"
              $isSelect={payload.parentTaskId === 1}
              text="서브 테스크"
              onClick={() => {
                setParentTaskId(1);
              }}
            />
            <Button
              size="small"
              variant="quest"
              $isSelect={payload.parentTaskId === 2}
              text="퀘스트"
              onClick={() => {
                setParentTaskId(2);
              }}
            />
          </ButtonGroup>
        </SectionContainer>
        {/* task state end */}

        {/* task */}
        {payload.parentTaskId !== 0 && (
          <SectionContainer maxWidth="100%" direction="row" gap={24}>
            {payload.parentTaskId === 1 ||
              (payload.parentTaskId === 2 && (
                <TaskContainer>
                  <LabelContainer>
                    <Typography variant="small-text-b" color="negativeRed">
                      *
                    </Typography>
                    <Typography variant="small-text-b" color="black35">
                      테스크
                    </Typography>
                  </LabelContainer>
                  <Select
                    listLabel="테스크"
                    isEssential
                    value={payload.title}
                    type="select"
                  >
                    <SelectButton />
                  </Select>
                </TaskContainer>
              ))}

            {payload.parentTaskId === 2 && (
              <TaskContainer>
                <LabelContainer>
                  <Typography variant="small-text-b" color="negativeRed">
                    *
                  </Typography>
                  <Typography variant="small-text-b" color="black35">
                    서브 테스크
                  </Typography>
                </LabelContainer>
                <Select
                  listLabel="테스크"
                  isEssential
                  value={payload.title}
                  type="select"
                >
                  <SelectButton />
                </Select>
              </TaskContainer>
            )}
          </SectionContainer>
        )}
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
        <SectionContainer>
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
                value={new Date(payload.startDate as string)}
                setDate={(date) => handleChangeDate(date as Date, 'startDate')}
                placeholderText="프로젝트 시작 날짜"
              />

              <StyleCreateProjectModal.CrossDash></StyleCreateProjectModal.CrossDash>
              <InputWithCalendarArea
                value={new Date(payload.endDate as string)}
                setDate={(date) => handleChangeDate(date as Date, 'endDate')}
                placeholderText="프로젝트 종료 날짜"
              />
            </StyleCreateProjectModal.InputWithCalendarArea>

            <StyleCreateProjectModal.InputWithCalendarArea>
              <InputWithTimePicker
                date={new Date(payload.startDate as string)}
                setDate={setStartDate}
                placeholderText="프로젝트 시작 시간"
                isDisabled={!includeTime}
              />
              <StyleCreateProjectModal.CrossDash></StyleCreateProjectModal.CrossDash>
              <InputWithTimePicker
                date={new Date(payload.endDate as string)}
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
          <LabelContainer>
            <Typography variant="small-text-b" color="black35">
              상태
            </Typography>
          </LabelContainer>
          <Select
            listLabel="상태"
            value={
              <Tag
                type="situation"
                property={
                  SELECT_STATUS[payload.status].value as SituationProperty
                }
              />
            }
            type="select"
          >
            <SelectList>
              {Object.values(SELECT_STATUS).map((status) => (
                <SelectItem
                  key={status.value}
                  onClick={() => setStatus(status.id)}
                >
                  <Tag type="situation" property={status.value} />
                </SelectItem>
              ))}
            </SelectList>
            <SelectButton />
          </Select>
        </SectionContainer>
        {/* status end */}

        {/* owner */}
        <SectionContainer>
          <LabelContainer>
            <Typography variant="small-text-b" color="black35">
              담당자
            </Typography>
          </LabelContainer>
          {/* owner 추가되어야 함 */}
          <Select listLabel="담당자" value={'담당자'} type="select">
            <SelectButton />
            {/* @TODO owner 추가시 list 뿌려주기 */}
          </Select>
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
