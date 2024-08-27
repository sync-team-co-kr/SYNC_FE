import { modalStore } from '@libs/store';

import { Container } from './style';

// 업무 생성 모달

export const CreateTaskModal = () => {
  const { closeModal } = modalStore();

  return (
    <Container>
      <div>
        <h1>업무 생성</h1>
        <button onClick={closeModal}>닫기</button>
      </div>
    </Container>
  );
};
