import React, { useEffect } from 'react';

import { Editor } from '@components/Editor';
import ScheduleRegistForm from '@components/Organism/ScheduleRegistForm';
import { Button } from '@components/common/Button';
import Toggle from '@components/common/Toggle/Toggle';
import StatusSelectDropdown from '@components/modal/CreateTaskModal/StatusSelectDropdown';
import TaskManagerSelectDropdown from '@components/modal/CreateTaskModal/TaskManagerSelectDropdown';
import { modalStore } from '@libs/store';
import { useTaskActions, useTaskState } from '@libs/store/task/task';
import { InputWrapper } from '@pages/projects/components/CreateProjectModal/styles';
import { CreateTaskPayload } from '@services/swagger/output/data-contracts';
import { useGetTask } from '@services/task';

import {
  Avatar,
  CommentContent,
  CommentDescription,
  CommentFormLabel,
  CommentInput,
  CommentInputForm,
  CommentInputWrapper,
  CommentItem,
  CommentList,
  CommentManageButtons,
  CommenterWrap,
  Content,
  DetailsSelectWrapper,
  PostAutoSummationToggle,
  PostHeader,
  PostLabel,
  SubmitButtonContainer,
  UpdateTaskModalCommentContainer,
  UpdateTaskModalContainer,
  UpdateTaskModalContent,
  UpdateTaskModalDetails,
  UpdateTaskModalPostContainer,
} from './style';

const FAKE_COMMENT_LIST = [
  {
    commenter: '김지용',
    content: '안녕하세요',
  },
];

// 업무 생성 모달
export const UpdateTaskModal = ({
  projectId,
  taskId,
}: {
  projectId: number;
  taskId: number;
}) => {
  const { closeModal } = modalStore();

  // 업무 생성 모달 payload 값들을 가져오는 state
  // const { resetPayload } = useTaskActions();
  const { payload, errorList, titleImage } = useTaskState();

  // 업무 생성 모달 payload 값들을 set 해주는 actions
  const { setEditTask, setStartDate, setEndDate, setDescription } =
    useTaskActions();

  const { task, isFetching } = useGetTask(projectId, taskId);

  useEffect(() => {
    if (task && !isFetching) {
      setEditTask({ projectId, ...task });
    }
  }, [isFetching, task?.taskId]);

  const handleEditTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

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
      startDate: payload.startDate?.toISOString(),
      endDate: payload.endDate?.toISOString(),
      parentTaskId: payload.parentTaskId,
      thumbnailIcon: titleImage?.startsWith('blob') ? '' : titleImage,
      status: payload.status,
    };
    console.log(taskData);
  };

  return (
    <UpdateTaskModalContainer>
      <Content>
        {/* 업무 내용 및 댓글 */}
        <UpdateTaskModalContent>
          {/* 업무 내용 */}
          <UpdateTaskModalPostContainer>
            <PostHeader>
              <PostLabel>업무 내용</PostLabel>
              <PostAutoSummationToggle>
                <span>텍스트 자동 요약</span>
                <Toggle isActive={true} toggleSwtich={() => ({})} />
              </PostAutoSummationToggle>
            </PostHeader>
            <Editor
              value={payload.description}
              onChangeText={(text) => setDescription(text)}
            />
          </UpdateTaskModalPostContainer>

          {/* 댓글 */}
          <UpdateTaskModalCommentContainer>
            <CommentInputForm>
              <CommentFormLabel>댓글</CommentFormLabel>
              <CommentInputWrapper>
                <Avatar></Avatar>
                <CommentInput
                  type="text"
                  value={''}
                  onChange={() => ({})}
                  placeholder="댓글을 입력해주세요"
                />
              </CommentInputWrapper>
            </CommentInputForm>
            <CommentList>
              {FAKE_COMMENT_LIST.map((comment) => (
                <CommentItem key={comment.commenter}>
                  <Avatar></Avatar>
                  <CommentContent>
                    <CommenterWrap>
                      <h5>{comment.commenter}</h5>
                      <span>2분전</span>
                    </CommenterWrap>
                    <CommentDescription>{comment.content}</CommentDescription>
                    <CommentManageButtons>
                      <Button
                        size="medium"
                        variant="text"
                        onClick={() => ({})}
                        text="편집"
                      />
                      <Button
                        size="medium"
                        variant="text"
                        onClick={() => ({})}
                        text="삭제"
                      />
                    </CommentManageButtons>
                  </CommentContent>
                </CommentItem>
              ))}
            </CommentList>
          </UpdateTaskModalCommentContainer>
        </UpdateTaskModalContent>
        <UpdateTaskModalDetails>
          <h4>세부사항</h4>
          <DetailsSelectWrapper>
            <StatusSelectDropdown />
          </DetailsSelectWrapper>
          <DetailsSelectWrapper>
            <TaskManagerSelectDropdown />
          </DetailsSelectWrapper>
          <DetailsSelectWrapper>
            <InputWrapper>
              <ScheduleRegistForm
                startDate={payload.startDate}
                endDate={payload.endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />
            </InputWrapper>
          </DetailsSelectWrapper>
        </UpdateTaskModalDetails>
      </Content>
      <SubmitButtonContainer>
        <Button variant="text" size="medium" text="취소" onClick={closeModal} />
        <Button
          variant="fill"
          size="medium"
          text="저장"
          onClick={handleEditTask}
        />
      </SubmitButtonContainer>
    </UpdateTaskModalContainer>
  );
};
