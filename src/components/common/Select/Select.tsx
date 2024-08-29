import { PropsWithChildren, useState } from 'react';

import { SelectProvider } from './Select.provider';

type SelectProps = {
  value: string;
  setValue: (value: any[] | any) => void;
  type: 'checkbox' | 'select';
  label?: string;
  listLabel?: string;
  isEssential?: boolean;
};

export const Select = ({
  children,
  ...props
}: SelectProps & PropsWithChildren) => {
  const [isOpen, setToggleOpen] = useState(false);

  const { value, type, label, listLabel, isEssential, setValue } = props;

  return (
    <SelectProvider
      isActivated={isOpen}
      value={value}
      type={type}
      setValue={setValue}
      label={label}
      listLabel={listLabel}
      isEssential={isEssential}
      setToggleOpen={setToggleOpen}
    >
      {children}
    </SelectProvider>
  );
};
