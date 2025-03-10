import { ForwardedRef, forwardRef, useEffect } from 'react';

// import { useSearchParams } from 'react-router-dom';
import { ReactComponent as Close } from '@assets/cancel-x.svg';
import { TaskItem } from '@components/TaskItem';
import { Button } from '@components/common/Button';
import { Typography } from '@components/common/Typography';
import { CreateTaskModal } from '@components/modal/CreateTaskModal';
import { RawProject } from '@customTypes/project';
import { modalStore } from '@libs/store';
import { useTaskActions } from '@libs/store/task/task';
import { useGetProjects } from '@services/project/Project.hooks';

import {
  CalendarTaskDropdownContainer,
  CalendarTaskDropdownContent,
  CalendarTaskDropdownHeader,
  TaskSelectItemList,
} from './style';
import { CalendarTaskDropdownProps } from './types';

const CalendarTaskDropdown = (
  {
    isOpen,
    setClose,
    as: Component = CalendarTaskDropdownContainer,
  }: CalendarTaskDropdownProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const { projects } = useGetProjects();
  const { openModal } = modalStore();

  const { setProject } = useTaskActions();
  const handleOpenCreateTaskModal = (project: RawProject) => {
    openModal(CreateTaskModal, '업무 생성');
    setProject(project);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        typeof ref !== 'function' &&
        !!ref &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  if (isOpen) {
    return (
      <Component ref={ref}>
        <CalendarTaskDropdownHeader>
          <Typography color="black" variant="heading-3">
            일정 등록하기
          </Typography>
          <Button
            size="small"
            variant="text"
            $hasIcon
            $renderIcon={<Close width={24} height={24} />}
            onClick={setClose}
          />
        </CalendarTaskDropdownHeader>

        <CalendarTaskDropdownContent>
          <TaskSelectItemList>
            {projects?.map((project) => (
              <TaskItem
                situations={[]}
                onClick={() => handleOpenCreateTaskModal(project)}
                works={[]}
                key={project.projectId}
                title={project.title}
                subTitle={project.subTitle}
                date={{
                  start: new Date(project.startDate || 1),
                  end: new Date(project.endDate || 1),
                }}
              />
            ))}
          </TaskSelectItemList>
        </CalendarTaskDropdownContent>
      </Component>
    );
  }

  return null;
};

export default forwardRef(CalendarTaskDropdown);
