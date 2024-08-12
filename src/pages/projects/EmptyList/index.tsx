import EmptyImage from '@assets/projects/empty-image.png';

import { EmptyListContainer } from './EmptyList.style';

export const EmptyList = () => {
  return (
    <EmptyListContainer>
      <img src={EmptyImage} alt="empty" />
      <h2>프로젝트가 없습니다.</h2>
      <p>새로운 프로젝트를 생성해보세요!</p>
    </EmptyListContainer>
  );
};
