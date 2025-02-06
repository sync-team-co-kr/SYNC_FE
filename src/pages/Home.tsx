import { modalStore } from '@libs/store';

import Modal from './Modal';

function Home() {
  const { openModal } = modalStore();
  return (
    <div>
      <button onClick={() => openModal(Modal, '홈 모달')}>모달 열기</button>
    </div>
  );
}

export default Home;
