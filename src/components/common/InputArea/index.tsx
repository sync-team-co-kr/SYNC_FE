import React from 'react';

import { SInputArea } from './InputArea.style';
import { InputProps } from './indexArea.types';

const InputArea = ({
  value,
  onChange,
  placeholderText,
  labelText,
  isDisabled = false,
}: InputProps) => {
  return (
    <SInputArea>
      <label>{labelText}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholderText}
        disabled={isDisabled}
      />
    </SInputArea>
  );
};

export default InputArea;
