import React, { useEffect, useState } from 'react';

import { Typography } from '@components/common';
import { Select } from '@components/common/Select/Select';
import { SelectButton } from '@components/common/Select/Select.Button';
import { SelectItem, SelectList } from '@components/common/Select/Select.list';
import { searchFilter } from '@components/common/Select/Select.utils';
import { LabelContainer, TaskContainer } from '@components/common/Select/style';
import Textfield from '@components/common/Textfield';
import { useTaskActions, useTaskState } from '@libs/store/task/task';
import { useGetTaskChildren, useGetTasks } from '@services/task';

interface ParentTaskSelectDropdownProps {
  taskDepthName: '테스크' | '서브 테스크' | '퀘스트';
}

const ParentTaskSelectDropdown = ({
  taskDepthName,
}: ParentTaskSelectDropdownProps) => {
  const {
    project,
    payload: { parentTaskId },
  } = useTaskState();
  const { setParentTaskId } = useTaskActions();

  const { tasks } = useGetTasks(project.projectId);
  const { taskChildren } = useGetTaskChildren(parentTaskId);

  const [parentTaskSearch, setParentTaskSearch] = useState('');
  const [taskSearchResults, setTaskSearchResults] = useState(tasks);
  const [selectedTaskTitle, setSelectedTaskTitle] = useState('');

  console.log(taskSearchResults);

  useEffect(() => {
    if (taskDepthName === '테스크') {
      setTaskSearchResults(tasks);
    }
    if (taskDepthName === '서브 테스크') {
      setTaskSearchResults(taskChildren?.subTasks || []);
    }
  }, [tasks, taskChildren]);

  const handleParentTaskSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParentTaskSearch(e.target.value);
    setTaskSearchResults(searchFilter(e.target.value, tasks));
  };

  return (
    <TaskContainer>
      <LabelContainer>
        <Typography variant="small-text-b" color="negativeRed">
          *
        </Typography>
        <Typography variant="small-text-b" color="black35">
          {taskDepthName}
        </Typography>
      </LabelContainer>
      <Select
        listLabel={taskDepthName}
        isEssential
        value={selectedTaskTitle}
        type="select"
      >
        <SelectButton />
        <SelectList>
          <Textfield
            variant="search"
            type="search"
            placeholder="검색"
            value={parentTaskSearch}
            onChange={handleParentTaskSearch}
          />
          {taskSearchResults?.map((task) => (
            <SelectItem
              key={task.taskId}
              onClick={() => {
                setParentTaskId(task.taskId);
                setSelectedTaskTitle(task.title);
              }}
            >
              <Typography variant="paragraph" color="black70">
                {task.title}
              </Typography>
            </SelectItem>
          ))}
        </SelectList>
      </Select>
    </TaskContainer>
  );
};

export default ParentTaskSelectDropdown;
