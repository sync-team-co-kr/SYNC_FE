import { useState } from 'react';

import { SelectButton } from './Select.Button';
import { SelectList } from './Select.list';
import { SelectProvider } from './Select.provider';
import { SelectContainer } from './style';

type SelectProps = {
  value: string;
  setValue: (value: any[] | any) => void;
  options: any[];
  type: 'checkbox' | 'select';
  hasSearch?: boolean;
  label?: string;
};

export const Select = ({
  value,
  setValue,
  options,
  type,
  hasSearch,
  label,
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
    >
      <SelectContainer>
        <SelectButton onClick={() => setToggleOpen(!isOpen)} />
        <SelectList onSelect={setValue} />
      </SelectContainer>
    </SelectProvider>
  );
};
