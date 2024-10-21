import React from 'react';

import { ReactComponent as ProfileProject } from '@assets/Profile_Project.svg';
import ThumbnailDropdown from '@components/project/ThumbnailDropdown';
import useDropdown from '@hooks/useDropdown';

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
  const [
    isOpenThumbnailDropdown,
    toggleThumbnailDropdown,
    thumbnailDropdownRef,
  ] = useDropdown();
  return (
    <SInputArea>
      <label>{labelText}</label>
      <InputWithCoverIcon>
        <div ref={thumbnailDropdownRef}>
          <ProfileProject onClick={toggleThumbnailDropdown} />
          <ThumbnailDropdown isOpen={isOpenThumbnailDropdown} />
        </div>
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
