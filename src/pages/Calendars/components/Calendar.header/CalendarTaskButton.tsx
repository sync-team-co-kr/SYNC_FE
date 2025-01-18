import { ForwardedRef, forwardRef, useRef } from 'react';

import { ReactComponent as ProjectIcon } from '@assets/sideBar/project-icon.svg';
import { Button } from '@components/common/Button';
import { Portal } from '@components/common/Portal';
import CalendarTaskDropdown from '@components/dropdown/CalendarTaskDropdown';
import { useModalState } from '@hooks/useModalState';
import { vars } from 'token';

const CalendarTaskButton = (_: unknown, ref: ForwardedRef<HTMLDivElement>) => {
  const taskDropdownRef = useRef(null);
  const [isOpenTask, openTask, closeTask] = useModalState();
  return (
    <>
      <Button
        $hasIcon
        $renderIcon={
          <ProjectIcon
            width={18}
            height={18}
            strokeWidth={1.5}
            stroke={vars.sementic.color.black70}
          />
        }
        variant="outline"
        size="medium"
        text="일정 등록"
        onClick={openTask}
        $isSelect={isOpenTask}
      />
      <Portal
        container={typeof ref !== 'function' && !!ref ? ref.current : null}
      >
        <CalendarTaskDropdown
          isOpen={isOpenTask}
          setClose={closeTask}
          ref={taskDropdownRef}
        />
      </Portal>
    </>
  );
};

export default forwardRef(CalendarTaskButton);
