import { Typography } from '@components/common';
import { Select } from '@components/common/Select/Select';
import { SelectButton } from '@components/common/Select/Select.Button';
import { SelectItem, SelectList } from '@components/common/Select/Select.list';
import { LabelContainer } from '@components/common/Select/style';
import { Tag } from '@components/common/Tag';
import { SituationProperty } from '@components/common/Tag/types';
import { useTaskActions, useTaskState } from '@libs/store/task/task';

import { SELECT_STATUS } from './constants';

const StatusSelectDropdown = () => {
  const { payload } = useTaskState();
  const { setStatus } = useTaskActions();
  return (
    <>
      <LabelContainer>
        <Typography variant="small-text-b" color="black35">
          상태
        </Typography>
      </LabelContainer>
      <Select
        listLabel="상태"
        value={
          <Tag
            type="situation"
            property={SELECT_STATUS[payload.status].value as SituationProperty}
          />
        }
        type="select"
      >
        <SelectList>
          {Object.values(SELECT_STATUS)
            .reverse()
            .map((status) => (
              <SelectItem
                key={status.value}
                onClick={() => setStatus(status.id)}
              >
                <Tag type="situation" property={status.value} />
              </SelectItem>
            ))}
        </SelectList>
        <SelectButton />
      </Select>
    </>
  );
};

export default StatusSelectDropdown;
