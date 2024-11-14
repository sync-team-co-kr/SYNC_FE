import React from 'react';
import * as FaIconList from 'react-icons/fa';

import { useProjectActions } from '@libs/store/project/project';
import { styled } from 'styled-components';
import { vars } from 'token';

const IconListContent = styled.aside`
  height: 400px;
  padding: 12px;
  background-color: ${vars.sementic.color.white};
  overflow: scroll;
  display: grid;
  grid-template-columns: repeat(8, auto);
  row-gap: 12px;
  justify-items: center;
  button {
    width: 24px;
    height: 24px;
    padding: 0;
    background-color: transparent;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    cursor: pointer;
  }
`;

const ThumbnailIconPicker = ({ close }: { close: () => void }) => {
  const { setThumbnail } = useProjectActions();

  const handleClickIcon = (
    e: React.MouseEvent<HTMLButtonElement>,
    iconName: string,
  ) => {
    e.preventDefault();
    setThumbnail('I', iconName);
    close();
  };
  return (
    <IconListContent>
      {Object.entries(FaIconList).map(([iconName, Icon]) => (
        <button key={iconName} onClick={(e) => handleClickIcon(e, iconName)}>
          <Icon size="24" />
        </button>
      ))}
    </IconListContent>
  );
};

export default ThumbnailIconPicker;
