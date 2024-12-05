import { Typography } from '@components/common';
import { Select } from '@components/common/Select/Select';
import { SelectButton } from '@components/common/Select/Select.Button';
import { LabelContainer, TaskContainer } from '@components/common/Select/style';
import { useTaskState } from '@libs/store/task/task';

interface ParentTaskSelectDropdownProps {
  parentTaskName: '테스크' | '서브 테스크' | '퀘스트';
}

const ParentTaskSelectDropdown = ({
  parentTaskName,
}: ParentTaskSelectDropdownProps) => {
  const { payload } = useTaskState();
  return (
    <TaskContainer>
      <LabelContainer>
        <Typography variant="small-text-b" color="negativeRed">
          *
        </Typography>
        <Typography variant="small-text-b" color="black35">
          {parentTaskName}
        </Typography>
      </LabelContainer>
      <Select
        listLabel={parentTaskName}
        isEssential
        value={payload.title}
        type="select"
      >
        <SelectButton />
      </Select>
    </TaskContainer>
  );
};

export default ParentTaskSelectDropdown;
