import React, { useState } from 'react';

import createworkBoardimg from '@assets/projects/createworkboard.png';
import { Button } from '@components/common/Button';
import { Typography } from '@components/common/Typography';
import { AxiosResByData } from '@customTypes/common';
// 실제 데이터 타입
import styled from 'styled-components';

const ProjectWorkBoard = styled.li`
  background: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 8px 0 8px;
`;

const ProjectWorkBoardHeader = styled.section`
  display: flex;
  justify-content: space-between;
`;

const ProjectWorkBoardTitle = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin: 5px 0 5px 0;
`;

const TitleDetail = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  flex-grow: 1;
  gap: 4px;
`;

const ProjectInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid var(--Black-White-Black-10, #f4f4f4);
  background: #ffffff;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 12px;
  border-bottom: 1px solid var(--Black-White-Black-10, #f4f4f4);
  img {
    padding-left: 12px;
  }
`;

const InputTitle = styled.input`
  height: 40px;
  width: 100%;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
  border: none;
  border-radius: 12px;
  border-bottom: 1px solid var(--Black-White-Black-10, #f4f4f4);
  gap: 8px;
  &:focus {
    outline: none;
    border-bottom: none;
  }
  &::placeholder {
    color: var(--Black-White-Black-35, #b3b3b3);
  }
`;

const Inputcontents = styled.input`
  height: 64px;
  width: 100%;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  text-indent: 12px;
  border-radius: 12px;
  border: none;
  border-bottom: 1px solid var(--Black-White-Black-10, #f4f4f4);
  gap: 8px;
  &:focus {
    outline: none;
    border-bottom: none;
  }
  &::placeholder {
    color: var(--Black-White-Black-35, #b3b3b3);
  }
`;

const ProjectFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 8px;
`;

interface ProjectCreateTaskBoardProps {
  onClose: () => void;
  onTaskCreated: (newTask: AxiosResByData<any>) => void; // 타입을 맞춤
}

const CreateTaskBoard = ({
  onClose,
  // onTaskCreated,
}: ProjectCreateTaskBoardProps) => {
  const [workBoard, setWorkBoard] = useState({
    description: '',
    endDate: new Date().toISOString(),
    startDate: new Date().toISOString(),
    status: 2,
    title: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWorkBoard((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleCreateTask = async () => {
  //   try {
  //     const response: AxiosResByData<any> = await createTask({
  //       ...workBoard,
  //       projectId: 1,
  //     });

  //     console.log('업무가 성공적으로 생성되었습니다:', response);

  //     if (response && response.result) {
  //       console.log('업무가 성공적으로 생성되었습니다.');
  //       onTaskCreated(response); // 부모 컴포넌트에 새로운 워크보드 전달
  //       onClose(); // 성공적으로 생성되면 창 닫기
  //     } else {
  //       console.error('업무 생성 실패:', response.message);
  //     }
  //   } catch (error) {
  //     console.error('업무 생성 중 오류 발생:', error);
  //   }
  // };

  return (
    <ProjectWorkBoard>
      <ProjectWorkBoardHeader>
        <ProjectWorkBoardTitle>
          <Typography variant="small-text-b" color="black35">
            업무 생성
          </Typography>
          <TitleDetail>
            <Typography variant="small-text" color="black35">
              텍스트 자동 요약
            </Typography>
            <Typography variant="small-text" color="black35">
              토글
            </Typography>
          </TitleDetail>
        </ProjectWorkBoardTitle>
      </ProjectWorkBoardHeader>
      <ProjectInput>
        <Title>
          <img src={createworkBoardimg} />
          <InputTitle
            type="text"
            placeholder="제목을 입력해주세요."
            name="title"
            value={workBoard.title}
            onChange={handleInputChange}
          />
        </Title>
        <Inputcontents
          type="text"
          placeholder="내용을 입력해주세요."
          name="description"
          value={workBoard.description}
          onChange={handleInputChange}
        />
      </ProjectInput>
      <ProjectFooter>
        <Button
          size="small"
          variant="text"
          $hasIcon={false}
          $isDisabled={false}
          onClick={onClose}
          text="취소"
        />
        <Button
          size="small"
          variant="fill"
          $hasIcon={false}
          $isDisabled={false}
          onClick={() => {
            console.log('업무 생성');
          }}
          // onClick={handleCreateTask}
          text="확인"
        />
      </ProjectFooter>
    </ProjectWorkBoard>
  );
};

export default CreateTaskBoard;
