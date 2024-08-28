import { useState } from 'react';

import { Typography } from '@components/common/Typography';

import { SelectButton } from './Select.Button';
import { SelectList } from './Select.list';
import { SelectProvider } from './Select.provider';
import { LabelContainer, SelectContainer } from './style';

type SelectProps = {
  value: string;
  setValue: (value: any[] | any) => void;
  options: any[];
  type: 'checkbox' | 'select';
  hasSearch?: boolean;
  label?: string;
  listLabel?: string;
  isEssential?: boolean;
};

export const Select = ({
  value,
  setValue,
  options,
  type,
  hasSearch,
  label,
  listLabel,
  isEssential,
}: SelectProps) => {
  const [isOpen, setToggleOpen] = useState(false);

  return (
    <SelectProvider
      isOpen={isOpen}
      onClick={setValue}
      value={value}
      options={options}
      type={type}
      hasSearch={hasSearch}
      label={label}
      listLabel={listLabel}
      isEssential={isEssential}
    >
      <SelectContainer>
        <LabelContainer>
          {isEssential && (
            <Typography variant="small-text-b" color="negativeRed">
              *
            </Typography>
          )}
          <Typography variant="small-text-b" color="black35">
            {label}
          </Typography>
        </LabelContainer>
        <SelectButton onClick={() => setToggleOpen(!isOpen)} />
        <SelectList onSelect={setValue} />
      </SelectContainer>
    </SelectProvider>
  );
};
