import React from 'react';

import {ReactComponent as ProfileProject} from '@assets/Profile_Project.svg';

import { InputWithCoverIcon, SInputArea } from './InputArea.style';

interface InputWithIconAreaProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  labelText?: string;
  placeholderText: string;
}

const InputWithIconArea = ({
  value,
  setValue,
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
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholderText}
        />
      </InputWithCoverIcon>
    </SInputArea>
  );
};

export default InputWithIconArea;
