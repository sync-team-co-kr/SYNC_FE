import React, { useEffect, useState } from 'react';

import { Typography } from '@components/common';
import { Select } from '@components/common/Select/Select';
import { SelectButton } from '@components/common/Select/Select.Button';
import {
  SelectItem,
  SelectItemWrapper,
  SelectList,
} from '@components/common/Select/Select.list';
import { searchFilter } from '@components/common/Select/Select.utils';
import { LabelContainer } from '@components/common/Select/style';
import Textfield from '@components/common/Textfield';
import { IMember } from '@customTypes/member';
import { useTaskState } from '@libs/store/task/task';

const TaskManagerSelectDropdown = () => {
  const { project } = useTaskState();

  const [taskManagerKeyword, setTaskManagerKeyword] = useState('');
  const [taskManagerSearchResults, setTaskManagerSearchResults] = useState<
    IMember[] | undefined
  >(project.members);

  useEffect(() => setTaskManagerSearchResults(project.members), [project]);

  const handleTaskManagerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskManagerKeyword(e.target.value);
    setTaskManagerSearchResults(searchFilter(e.target.value, project.members));
  };

  const handleClickTaskManagerItem = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    // 담당자 목록에 선택된 담당자가 포함되어 있는지 확인
    /*
    const includedSelectedTaskManagers = taskManagers.some(
      (taskManager) => taskManager.id === member.id,
    );

    if (includedSelectedTaskManagers) {
      setTaskManagers('sub', member);
    } else {
      setTaskManagers('add', member);
    }
    */
  };

  return (
    <>
      <LabelContainer>
        <Typography variant="small-text-b" color="black35">
          담당자
        </Typography>
      </LabelContainer>
      <Select listLabel="담당자" value={'담당자'} type="select">
        <SelectButton />
        <SelectList>
          <Textfield
            variant="search"
            type="search"
            placeholder="담당자 검색"
            value={taskManagerKeyword}
            onChange={handleTaskManagerSearch}
          />

          {taskManagerSearchResults?.map((member) => (
            <SelectItemWrapper onClick={(e) => handleClickTaskManagerItem(e)}>
              <SelectItem key={member.id}>{member.username}</SelectItem>
              {/* taskManagers.some(
                (taskManager) => taskManager.id === member.id,
              ) && <CheckIcon /> */}
            </SelectItemWrapper>
          ))}
        </SelectList>
      </Select>
    </>
  );
};

export default TaskManagerSelectDropdown;
