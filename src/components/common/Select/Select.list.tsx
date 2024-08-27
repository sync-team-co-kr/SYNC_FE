import { Typography } from '@components/common/Typography';
import { styled } from 'styled-components';
import { vars } from 'token';

import { useSelectContext } from './Select.provider';
import { SelectListProps } from './types';

const ListContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 55px;
  left: 0;
  background: ${vars.sementic.color.white};
  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.05);
  border: 1px solid ${vars.sementic.color.black10};
  padding: 12px 0;
`;

const ListItem = styled.div`
  padding: 6px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background: ${vars.sementic.color.black10};
  }
  transition: background 0.25s ease-in;
`;

export const SelectList = ({ onSelect }: SelectListProps) => {
  const selectContext = useSelectContext();

  const { isOpen } = selectContext;

  const handleClick = (value: any) => {
    onSelect(value);
  };

  if (!isOpen) {
    return null;
  }
  return (
    <ListContainer>
      <Typography variant="paragraph" color="black70">
        {selectContext.label}
      </Typography>
      {selectContext.options?.map((option) => (
        <ListItem key={option.value} onClick={() => handleClick(option)}>
          {option.title}
        </ListItem>
      ))}
    </ListContainer>
  );
};
