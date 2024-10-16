import React from 'react';

import { ReactComponent as ProfileProject } from '@assets/Profile_Project.svg';

import { InputWithCoverIcon, SInputArea } from './InputArea.style';

interface InputWithIconAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelText?: string;
  placeholderText: string;
}

const InputWithIconArea = ({
  value,
  onChange,
  labelText,
  placeholderText,
}: InputWithIconAreaProps) => {
  return (
    <SInputArea>
      <label>{labelText}</label>
      <InputWithCoverIcon>
        <ProfileProject />
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholderText}
        />
      </InputWithCoverIcon>
    </SInputArea>
  );
};

export default InputWithIconArea;
