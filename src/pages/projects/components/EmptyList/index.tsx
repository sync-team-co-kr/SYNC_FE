import { ReactComponent as Add } from '@assets/add.svg';
import EmptyImage from '@assets/projects/empty-image.png';
import { Button } from '@components/common/Button';
import { Typography } from '@components/common/Typography';
import { modalStore } from '@libs/store';
import CreateProjectModal from '@pages/projects/components/CreateProjectModal';

import {
  EmptyListContainer,
  EmptyListImageContainer,
  TypographyContainer,
} from './EmptyList.style';

export const EmptyList = () => {
  const { openModal } = modalStore();

  return (
    <EmptyListContainer>
      <EmptyListImageContainer>
        <img src={EmptyImage} alt="empty" />
      </EmptyListImageContainer>

      <TypographyContainer>
        <Typography variant="heading-3" color="black">
          프로젝트가 없습니다.
        </Typography>
        <Typography variant="heading-5" color="black70">
          새로운 프로젝트를 만들어 팀과 함께 프로젝트를 관리해보세요
        </Typography>
      </TypographyContainer>
      <Button
        size="medium"
        variant="fill"
        text="프로젝트 추가"
        $hasIcon
        onClick={() => openModal(CreateProjectModal, '프로젝트 추가')}
        $isDisabled={false}
        $iconPosition="left"
        $renderIcon={<Add />}
      />
    </EmptyListContainer>
  );
};
