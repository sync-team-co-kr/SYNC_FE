// 업무 생성 모달 내 form
import { ChangeEvent, useEffect, useState } from 'react';

import { ReactComponent as CloseX } from '@assets/cancel-x.svg';
import { Editor } from '@components/Editor';
import { Button } from '@components/common/Button';
import { Select } from '@components/common/Select/Select';
import { SelectButton } from '@components/common/Select/Select.Button';
import { SelectItem, SelectList } from '@components/common/Select/Select.list';
import { searchFilter } from '@components/common/Select/Select.utils';
import { LabelContainer, TaskContainer } from '@components/common/Select/style';
import { Tag } from '@components/common/Tag';
import { SituationProperty } from '@components/common/Tag/types';
import Textfield from '@components/common/Textfield';
import { Typography } from '@components/common/Typography';
import { SELECT_STATUS } from '@components/modal/CreateTaskModal/constants';
import {
  ButtonGroup,
  Container,
  ContainerContent,
  ContainerFooter,
  ContainerHeader,
  SectionContainer,
} from '@components/modal/CreateTaskModal/style';
import { modalStore } from '@libs/store';
import { useTaskActions, useTaskState } from '@libs/store/task/task';
import { useGetProjects } from '@services/project/Project.hooks';
import { useCreateTask } from '@services/task/Task.hooks';

import { EditTaskModalProps } from './types';

// 업무 생성 모달

export const EditTaskModal = ({
  editType = 'calendar',
}: EditTaskModalProps) => {
  const { closeModal } = modalStore();

  // 업무 생성 모달 payload 값들을 가져오는 state
  // const { resetPayload } = useTaskActions();
  const { payload, project, errorList } = useTaskState();

  // 업무 생성 모달 payload 값들을 set 해주는 actions
  const {
    setProject,
    setTitle,
    setStatus,
    setDescription,
    setParentTaskId,
    // setEditTask,
  } = useTaskActions();

  console.log(editType);
  // projectData를 가져오는 hooks
  const { projects } = useGetProjects();

  // project 자식 업무를 가져오는 hooks
  // const { taskChildren } = useGetTaskChildren(taskId);

  // 프로젝트 검색 state
  const [projectSearch, setProjectSearch] = useState('');
  // 검색 필터링된 프로젝트 리스트
  const [projectList, setProjectList] = useState(projects);

  const { createTaskMutate } = useCreateTask();
  const handleCreateTask = () => {
    if (errorList.length > 0) {
      alert('필수 입력값을 입력해주세요');
      return;
    }
    createTaskMutate(
      {
        data: {
          ...payload,
          startDate: payload.startDate?.toISOString(),
          endDate: payload.endDate?.toISOString(),
        },
      },
      {
        onSuccess: () => {
          alert('업무가 생성되었습니다.');
        },

        onError: (error) => {
          alert(error);
        },
      },
    );
  };

  // 프로젝트 검색

  const handleProjectSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectSearch(e.target.value);
    setProjectList(searchFilter(e.target.value, projects));
  };

  useEffect(() => {
    setProjectList(projects);
  }, [projects]);

  return (
    <Container>
      <ContainerHeader>
        <Typography variant="heading-3" color="black">
          업무 수정
        </Typography>
        <Button
          $hasIcon
          $renderIcon={<CloseX width={24} height={24} />}
          onClick={closeModal}
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
        <SectionContainer direction="row" gap={24} maxWidth="100%">
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
        </SectionContainer>
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
            variant="outlined"
            placeholder="업무명을 입력해주세요"
            value={payload.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </SectionContainer>
        {/* icon & task end */}

        {/* date */}
        <SectionContainer>
          <LabelContainer>
            <Typography variant="small-text-b" color="black35">
              일정
            </Typography>
          </LabelContainer>
          <SectionContainer direction="row" gap={24}>
            <Textfield
              variant="outlined"
              placeholder="날짜"
              value={''}
              onChange={(e) => console.log(e.target.value)}
            />
            <Textfield
              variant="outlined"
              placeholder="날짜"
              value={''}
              onChange={(e) => console.log(e.target.value)}
            />
          </SectionContainer>
          <SectionContainer direction="row" gap={24}>
            <Textfield
              variant="outlined"
              placeholder="시간"
              value={''}
              onChange={(e) => console.log(e.target.value)}
            />
            <Textfield
              variant="outlined"
              placeholder="시간"
              value={''}
              onChange={(e) => console.log(e.target.value)}
            />
          </SectionContainer>
        </SectionContainer>
        {/* date end */}

        {/* description */}
        <SectionContainer>
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
