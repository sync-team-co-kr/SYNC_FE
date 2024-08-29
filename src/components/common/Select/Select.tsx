import { PropsWithChildren, ReactNode, useState } from 'react';

import { SelectProvider } from './Select.provider';

type SelectProps = {
  value: string | number | ReactNode;
  type: 'checkbox' | 'select';
  listLabel?: string;
  isEssential?: boolean;
};

export const Select = ({
  children,
  ...props
}: SelectProps & PropsWithChildren) => {
  const [isOpen, setToggleOpen] = useState(false);

  const { value, type, listLabel, isEssential } = props;

  return (
    <SelectProvider
      isActivated={isOpen}
      value={value}
      type={type}
      listLabel={listLabel}
      isEssential={isEssential}
      setToggleOpen={setToggleOpen}
    >
      {children}
    </SelectProvider>
  );
};
