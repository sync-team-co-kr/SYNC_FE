import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as ArrowBottom } from '@assets/common/arrow/arrow-bottom.svg';
import ProjectNavigation from '@components/dropdown/ProjectNavigationDropdown';
import { RawProject } from '@customTypes/project';
import { useBreadCrumbActions } from '@libs/store/breadcrumb/breadcrumb';
import { useGetProjects } from '@services/project/Project.hooks';
import { styled } from 'styled-components';
import { vars } from 'token';

const ProjectNavigator = styled.section`
  width: fit-content;
  height: 48px;
  padding: 0px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  position: relative;
  top: 20px;
  & > div {
    width: 100px;
    margin: 8px 12px;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    h5 {
      color: ${vars.sementic.color.black};
      font-size: ${vars.sementic.typography['heading-4'].fontSize};
      font-weight: ${vars.sementic.typography['heading-4'].fontWeight};
    }
  }
`;

const ProjectDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setProjectRoute } = useBreadCrumbActions();
  const { projects } = useGetProjects();

  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleSelectProjectNavigationItem = (project: RawProject) => {
    setProjectRoute(project.title);
    navigate(`/projects/${project.projectId}`);
    setIsOpen(false);
  };

  const modalOutSideClick = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', modalOutSideClick);
    return () => {
      document.removeEventListener('mousedown', modalOutSideClick);
    };
  }, [dropdownRef, isOpen]);

  return (
    <ProjectNavigator ref={dropdownRef}>
      <div onClick={() => setIsOpen((prevState) => !prevState)}>
        <h5>전체보기</h5>
        <ArrowBottom />
      </div>

      <ProjectNavigation
        isOpen={projects?.length !== 0 ? isOpen : false}
        projects={projects}
        handleSelectNavigationItem={handleSelectProjectNavigationItem}
      />
    </ProjectNavigator>
  );
};

export default ProjectDropdown;
