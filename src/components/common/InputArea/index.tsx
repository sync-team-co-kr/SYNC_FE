import React from 'react';

import { SInputArea } from './InputArea.style';
import { InputProps } from './indexArea.types';

const InputArea = ({
  value,
  setValue,
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
        onChange={(e) => setValue && setValue(e.target.value)}
        placeholder={placeholderText}
        disabled={isDisabled}
      />
    </SInputArea>
  );
};

export default InputArea;
