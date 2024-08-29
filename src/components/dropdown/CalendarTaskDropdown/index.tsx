import { ForwardedRef, forwardRef, useEffect } from 'react';

import { ReactComponent as Close } from '@assets/cancel-x.svg';
import { TaskItem } from '@components/TaskItem';
import { Button } from '@components/common/Button';
import { Typography } from '@components/common/Typography';
import { useGetProjectList } from '@services/project/Project.hooks';

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
  const { projectListData } = useGetProjectList();

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
            hasIcon
            renderIcon={<Close width={24} height={24} />}
            onClick={setClose}
          />
        </CalendarTaskDropdownHeader>

        <CalendarTaskDropdownContent>
          <TaskSelectItemList>
            {projectListData?.map((project) => (
              <TaskItem
                situations={[]}
                onClick={() => {
                  console.log('click');
                }}
                works={[]}
                key={project.projectId}
                title={project.title}
                subTitle={project.subTitle}
                date={{
                  start: project.startDate,
                  end: project.endDate,
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
