import { ReactComponent as Add } from '@assets/add.svg';
import { Button } from '@components/common/Button';
import useModal from '@hooks/useModal';
import CreateProjectModal from '@pages/projects/components/CreateProjectModal';
import styled from 'styled-components';

const Container = styled.div`
  width: 150px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ProjectAddButton = () => {
  const [openModal] = useModal();
  return (
    <Container>
      <Button
        size="medium"
        variant="fill"
        $hasIcon={true}
        $isDisabled={false}
        $iconPosition="left"
        onClick={() => openModal(CreateProjectModal)}
        text="프로젝트 추가"
        $renderIcon={<Add />}
      />
    </Container>
  );
};

export default ProjectAddButton;
