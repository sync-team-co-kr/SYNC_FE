// 업무 생성 모달 내 form
import { ReactComponent as CloseX } from '@assets/cancel-x.svg';
import { ReactComponent as MeatBalls } from '@assets/meatballs.svg';
import projectIcon from '@assets/project-icon.png';
import { Editor } from '@components/Editor';
import Thumbnail from '@components/Thumbnail/Thumbnail';
import { Button } from '@components/common/Button';
import { Select } from '@components/common/Select/Select';
import { SelectButton } from '@components/common/Select/Select.Button';
import { SelectItem, SelectList } from '@components/common/Select/Select.list';
import { LabelContainer } from '@components/common/Select/style';
import { Tag } from '@components/common/Tag';
import { SituationProperty } from '@components/common/Tag/types';
import Textfield from '@components/common/Textfield';
import Toggle from '@components/common/Toggle/Toggle';
import { Typography } from '@components/common/Typography';
import { modalStore } from '@libs/store';
import { useTaskActions, useTaskState } from '@libs/store/task/task';
import { useCreateTask } from '@services/task/Task.hooks';

import { SELECT_STATUS } from './constants';
import {
  Avatar,
  Breadcrumb,
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
  PostAutoSummationToggle,
  PostHeader,
  PostLabel,
  SubmitButtonContainer,
  TitleWrap,
  Tools,
  UpdateTaskModalArticle,
  UpdateTaskModalCommentContainer,
  UpdateTaskModalContainer,
  UpdateTaskModalContent,
  UpdateTaskModalHeader,
  UpdateTaskModalPostContainer,
} from './style';

const FAKE_COMMENT_LIST = [
  {
    commenter: '김지용',
    content: '안녕하세요',
  },
];

// 업무 생성 모달
export const UpdateTaskModal = () => {
  const { closeModal } = modalStore();

  // 업무 생성 모달 payload 값들을 가져오는 state
  // const { resetPayload } = useTaskActions();
  const { payload, errorList } = useTaskState();

  // 업무 생성 모달 payload 값들을 set 해주는 actions
  const { setStatus, setDescription } = useTaskActions();

  // projectData를 가져오는 hooks

  const { createTaskMutate } = useCreateTask();

  return (
    <UpdateTaskModalContainer>
      <UpdateTaskModalHeader>
        <UpdateTaskModalArticle>
          <Breadcrumb>
            <span>가상의 프로젝트</span>
            <span>/</span>
            <span>테스크</span>
          </Breadcrumb>
          <TitleWrap>
            <Thumbnail thumbnail={''} thumbnailType="N" />
            <h2>Title</h2>
          </TitleWrap>
        </UpdateTaskModalArticle>
        <Tools>
          <MeatBalls />
          <CloseX />
        </Tools>
      </UpdateTaskModalHeader>
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
                  onChange={(e) => ({})}
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
      </Content>
      <SubmitButtonContainer></SubmitButtonContainer>
    </UpdateTaskModalContainer>
  );
};
