import { useRef, useState } from 'react';

import { ReactComponent as Calender } from '@assets/projects/calendarSM.svg';
import { ReactComponent as User } from '@assets/projects/user.svg';
import { ReactComponent as Search } from '@assets/search.svg';
import { Dropdown } from '@components/common';
import { Button } from '@components/common/Button';
import styled from 'styled-components';

const Container = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const FilterList = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
`;

const FilterListItem = styled.li`
  padding: 20px 15px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

type ProjectFilterButtonType = {
  getUpcomingProjects: () => void;
  getMyProjects: () => void;
};

const ProjectFilterButton = ({
  getUpcomingProjects,
  getMyProjects,
}: ProjectFilterButtonType) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLTableSectionElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Container>
      <Button
        size="medium"
        variant="outline"
        $hasIcon={true}
        $isDisabled={false}
        $iconPosition="left"
        onClick={toggleDropdown}
        text="필터"
        $renderIcon={<Search />}
      />
      <Dropdown
        isOpen={isOpen}
        dropdownRef={dropdownRef}
        left="-150px"
        bottom="-125px"
      >
        <FilterList onClick={toggleDropdown}>
          <FilterListItem onClick={getMyProjects}>
            <User />
            <span>내가 속한 프로젝트</span>
          </FilterListItem>

          <FilterListItem onClick={getUpcomingProjects}>
            <Calender />
            <span>마감이 임박한 프로젝트</span>
          </FilterListItem>
        </FilterList>
      </Dropdown>
    </Container>
  );
};

export default ProjectFilterButton;
