import { Typography } from '@components/common';
import { Button } from '@components/common/Button';
import { LabelContainer } from '@components/common/Select/style';
import { useTaskActions, useTaskState } from '@libs/store/task/task';

import { ButtonGroup } from './style';

const TaskParentIdSetButtonGroup = () => {
  const { payload } = useTaskState();
  const { setParentTaskId } = useTaskActions();
  return (
    <>
      <LabelContainer>
        <Typography variant="small-text-b" color="negativeRed">
          *
        </Typography>
        <Typography variant="small-text-b" color="black35">
          업무 속성
        </Typography>
      </LabelContainer>
      <ButtonGroup>
        <Button
          size="small"
          $isSelect={payload.parentTaskId === 0}
          variant="task"
          text="테스크"
          onClick={() => {
            setParentTaskId(0);
          }}
        />
        <Button
          size="small"
          variant="subTask"
          $isSelect={payload.parentTaskId === 1}
          text="서브 테스크"
          onClick={() => {
            setParentTaskId(1);
          }}
        />
        <Button
          size="small"
          variant="quest"
          $isSelect={payload.parentTaskId === 2}
          text="퀘스트"
          onClick={() => {
            setParentTaskId(2);
          }}
        />
      </ButtonGroup>
    </>
  );
};

export default TaskParentIdSetButtonGroup;
