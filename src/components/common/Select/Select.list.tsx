import { useEffect, useState } from 'react';

import Textfield from '@components/common/Textfield';
import { Typography } from '@components/common/Typography';
import { styled } from 'styled-components';
import { vars } from 'token';

import { useSelectContext } from './Select.provider';
import { searchFilter } from './Select.utils';
import { SelectListProps } from './types';

const ListContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 55px;
  left: 0;
  background: ${vars.sementic.color.white};
  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.05);
  border: 1px solid ${vars.sementic.color.black10};
  padding: 12px 8px;
  border-radius: 12px;
  gap: 8px;
  display: flex;
  flex-direction: column;
`;

const ListItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ListItem = styled.div`
  padding: 6px;
  cursor: pointer;
  width: 100%;
  border-radius: 8px;

  &:hover {
    background: ${vars.sementic.color.black10};
  }
  transition: background 0.25s ease-in;
`;

export const SelectList = ({ onSelect }: SelectListProps) => {
  const [search, setSearch] = useState('');
  const selectContext = useSelectContext();
  const { isOpen } = selectContext;

  const [filteredOptions, setFilteredOptions] = useState<any[] | undefined>(
    selectContext.options,
  );

  useEffect(() => {
    setFilteredOptions(selectContext.options);
  }, [selectContext.options]);

  const handleClick = (value: any) => {
    onSelect(value);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setFilteredOptions(searchFilter(value, selectContext.options));
  };

  if (!isOpen) {
    return null;
  }
  return (
    <ListContainer>
      <Typography variant="paragraph" color="black70">
        {selectContext.label}
      </Typography>
      {selectContext.hasSearch && (
        <Textfield
          type="search"
          placeholder="검색"
          variant="search"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      )}
      <ListItemContainer>
        {filteredOptions?.map((option, index) => (
          <ListItem key={index} onClick={() => handleClick(option)}>
            <Typography variant="paragraph" color="black">
              {option.title}
            </Typography>
          </ListItem>
        ))}
      </ListItemContainer>
    </ListContainer>
  );
};
