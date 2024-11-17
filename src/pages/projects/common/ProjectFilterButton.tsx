import { useRef } from 'react';

import { ReactComponent as Search } from '@assets/filter.svg';
import { Button } from '@components/common/Button';
import { ProjectListDropdown } from '@components/dropdown/ProjectListDropdown';
import { useModalState } from '@hooks/useModalState';
import styled from 'styled-components';

const Container = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ProjectFilterButton = () => {
  const projectListDropdownRef = useRef(null);
  const [
    isOpenProjectListDropdown,
    openProjectListDropdown,
    closeProjectListDropdown,
  ] = useModalState();

  return (
    <Container>
      <Button
        size="medium"
        variant="outline"
        $hasIcon={true}
        $isDisabled={false}
        $iconPosition="left"
        onClick={openProjectListDropdown}
        text="필터"
        $renderIcon={<Search />}
      />
      <ProjectListDropdown
        isOpen={isOpenProjectListDropdown}
        setClose={closeProjectListDropdown}
        ref={projectListDropdownRef}
      />
    </Container>
  );
};

export default ProjectFilterButton;
