import React from 'react';

import { ReactComponent as ProfileProject } from '@assets/Profile_Project.svg';
import ThumbnailDropdown from '@components/project/ThumbnailDropdown';
import useDropdown from '@hooks/useDropdown';
import { useProjectState } from '@libs/store/project/project';
import { styled } from 'styled-components';

import { InputWithCoverIcon, SInputArea } from './InputArea.style';

interface InputWithIconAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelFC: JSX.Element;
  placeholderText: string;
}

const ProjectThumbnail = styled.div`
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputWithIconArea = ({
  value,
  onChange,
  labelFC,
  placeholderText,
}: InputWithIconAreaProps) => {
  const [isOpen, toggleActiveState, dropdownRef] = useDropdown();
  const { payload: {thumbnail} } = useProjectState();

  return (
    <SInputArea>
      {labelFC}
      <InputWithCoverIcon>
        <div ref={dropdownRef}>
          {thumbnail.value ? (
            <ProjectThumbnail onClick={toggleActiveState}></ProjectThumbnail>
          ) : (
            <ProfileProject onClick={toggleActiveState} />
          )}

          <ThumbnailDropdown
            isOpen={isOpen}
            closeDropdown={toggleActiveState}
          />
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
