import React, { useEffect, useState } from 'react';

import { Typography } from '@components/common';
import { Select } from '@components/common/Select/Select';
import { SelectButton } from '@components/common/Select/Select.Button';
import { SelectItem, SelectList } from '@components/common/Select/Select.list';
import { searchFilter } from '@components/common/Select/Select.utils';
import { LabelContainer } from '@components/common/Select/style';
import Textfield from '@components/common/Textfield';
import { useTaskActions, useTaskState } from '@libs/store/task/task';
import { useGetProjects } from '@services/project/Project.hooks';

const ProjectSelectDropdown = () => {
  const { projects } = useGetProjects();
  const { project } = useTaskState();
  const { setProject, setProjectId } = useTaskActions();

  // 프로젝트 검색 state
  const [projectSearch, setProjectSearch] = useState('');
  // 검색 필터링된 프로젝트 리스트
  const [projectList, setProjectList] = useState(projects);

  useEffect(() => setProjectList(projects), [projects]);

  // 프로젝트 검색
  const handleProjectSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectSearch(e.target.value);
    setProjectList(searchFilter(e.target.value, projects));
  };

  return (
    <>
      <LabelContainer>
        <Typography variant="small-text-b" color="negativeRed">
          *
        </Typography>
        <Typography variant="small-text-b" color="black35">
          프로젝트 명
        </Typography>
      </LabelContainer>
      <Select
        listLabel="프로젝트"
        isEssential
        value={
          project.title !== '' ? project.title : '프로젝트를 선택해 주세요'
        }
        type="select"
      >
        <SelectButton />
        <SelectList>
          <Textfield
            variant="search"
            type="search"
            placeholder="검색"
            value={projectSearch}
            onChange={handleProjectSearch}
          />
          {projectList?.map((projectData) => (
            <SelectItem
              onClick={() => {
                setProject(projectData);
                setProjectId(projectData.projectId);
              }}
              key={projectData.projectId}
            >
              <Typography variant="paragraph" color="black70">
                {projectData.title}
              </Typography>
            </SelectItem>
          ))}
        </SelectList>
      </Select>
    </>
  );
};

export default ProjectSelectDropdown;
