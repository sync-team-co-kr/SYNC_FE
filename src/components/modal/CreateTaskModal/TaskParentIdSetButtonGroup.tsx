import React from 'react';

import { Typography } from '@components/common';
import { Button } from '@components/common/Button';
import { LabelContainer } from '@components/common/Select/style';

import { ButtonGroup } from './style';

const TaskParentIdSetButtonGroup = ({
  depth,
  setDepth,
}: {
  depth: number;
  setDepth: React.Dispatch<React.SetStateAction<number>>;
}) => {
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
          $isSelect={depth === 0}
          variant="task"
          text="테스크"
          onClick={() => {
            setDepth(0);
          }}
        />
        <Button
          size="small"
          variant="subTask"
          $isSelect={depth === 1}
          text="서브 테스크"
          onClick={() => {
            setDepth(1);
          }}
        />
        <Button
          size="small"
          variant="quest"
          $isSelect={depth === 2}
          text="퀘스트"
          onClick={() => {
            setDepth(2);
          }}
        />
      </ButtonGroup>
    </>
  );
};

export default TaskParentIdSetButtonGroup;
