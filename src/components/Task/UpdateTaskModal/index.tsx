import React, { useEffect, useState } from 'react';

import { Editor } from '@components/Editor';
import ScheduleRegistForm from '@components/Organism/ScheduleRegistForm';
import { Button } from '@components/common/Button';
import Toggle from '@components/common/Toggle/Toggle';
import StatusSelectDropdown from '@components/modal/CreateTaskModal/StatusSelectDropdown';
import TaskManagerSelectDropdown from '@components/modal/CreateTaskModal/TaskManagerSelectDropdown';
import { modalStore } from '@libs/store';
import { useTaskActions, useTaskState } from '@libs/store/task/task';
import { InputWrapper } from '@pages/projects/components/CreateProjectModal/styles';
import { useGetTask } from '@services/task';
import { useUpdateTask } from '@services/task/Task.hooks';
import axios from 'axios';
import { addDays, getDay, setHours, setMinutes, subHours } from 'date-fns';

import Comment from './Comment';
import {
  Avatar,
  CommentFormLabel,
  CommentInput,
  CommentInputForm,
  CommentInputWrapper,
  CommentList,
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

interface UpdateTaskPayload {
  projectId: number;
  taskId: number;
  title: string;
  description?: string;
  status: number;
  startDate?: string;
  endDate?: string;
  thumbnailIcon?: string;
}

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
export const UpdateTaskModal = ({
  projectId,
  taskId,
}: {
  projectId: number;
  taskId: number;
}) => {
  const { closeModal } = modalStore();
  const { updateTaskMutate } = useUpdateTask();

  // 업무 생성 모달 payload 값들을 가져오는 state
  // const { resetPayload } = useTaskActions();
  const { payload, errorList, titleImage } = useTaskState();

  // 업무 생성 모달 payload 값들을 set 해주는 actions
  const { setEditTask, setStartDate, setEndDate, setDescription } =
    useTaskActions();

  const { task } = useGetTask(taskId);

  const [taskImageUrls, setTaskImageUrls] = useState<string[]>([]);

  // 삭제된 이미지 src를 파악하기 위해 서버에서 받은 업무 내용의 이미지 src 검색
  const getImageUrl = (description: string) => {
    const splitedDescription = description.split('>');
    const imgContents = splitedDescription.filter((content) => {
      const matchedImgTag = content.match(/img src/);
      if (matchedImgTag) return true;
      return false;
    });
    const imageUrls = imgContents.map((imgContent) => {
      const splitedImgContent = imgContent.split('"');
      const [imageUrl] = splitedImgContent.filter((str) =>
        str.includes('https'),
      );
      return imageUrl;
    });
    setTaskImageUrls(imageUrls);
  };

  useEffect(() => {
    if (task) {
      setEditTask({ projectId, ...task });
      getImageUrl(task.description);
    }
  }, [task?.id]);

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

    const taskData: UpdateTaskPayload = {
      projectId: payload.projectId,
      taskId,
      title: payload.title,
      description: payload.description,
      startDate: payload.startDate?.toISOString(),
      endDate: payload.endDate?.toISOString(),
      thumbnailIcon: titleImage?.startsWith('blob') ? '' : titleImage,
      status: payload.status,
    };

    if (payload.startDate && payload.endDate) {
      taskData.startDate =
        payload.startDate.getTime() % (60 * 60 * 24) === 0
          ? combineDateTime(payload.startDate!)
          : new Date(payload.startDate!).toISOString();

      taskData.endDate =
        payload.endDate.getTime() % (60 * 60 * 24) === 0
          ? combineDateTime(payload.endDate!)
          : setHours(
              setMinutes(new Date(payload.endDate!), 59),
              23,
            ).toISOString();
    }

    const deleteImages: File[] = [];

    // 삭제된 이미지들을 찾아 deleteImages에 할당
    taskImageUrls.forEach(async (imageUrl) => {
      const isDeleted = !payload.description?.includes(imageUrl);
      if (isDeleted) {
        const filename = imageUrl.split('description/')[1];
        const fileType = `image/${filename.split('.')[1]}`;
        const { data: fileData } = await axios.get<
          string | Blob | ArrayBufferView | ArrayBuffer
        >(imageUrl);
        const deletedImage = new File([fileData], filename, {
          type: fileType,
        });
        deleteImages.push(deletedImage);
      }
    });

    updateTaskMutate({
      data: {
        ...taskData,
      },
      images: [],
      deleteImages,
      titleImage: '',
    });
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
                <Comment key={comment.content} comment={comment} />
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
