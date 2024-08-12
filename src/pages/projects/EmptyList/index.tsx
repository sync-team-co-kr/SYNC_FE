import EmptyImage from '@assets/projects/empty-image.png';
import { Button } from '@components/common/Button';
import { Typography } from '@components/common/Typography';

import { EmptyListContainer } from './EmptyList.style';

export const EmptyList = () => {
  return (
    <EmptyListContainer>
      <img src={EmptyImage} alt="empty" />
      <Typography variant="heading-3" color="black">
        프로젝트가 없습니다.
      </Typography>
      <Typography variant="heading-5" color="black70">
        새로운 프로젝트를 만들어 팀과 함께 프로젝트를 관리해보세요
      </Typography>
      <Button
        size="medium"
        variant="fill"
        text="프로젝트 추가"
        hasIcon
        onClick={() => console.log('프로젝트 추가 버튼 클릭')}
        isDisabled={false}
        iconPosition="left"
      />
    </EmptyListContainer>
  );
};
