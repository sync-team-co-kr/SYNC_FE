import { PropsWithChildren, useRef } from 'react';

import { Typography } from '@components/common/Typography';
import { useHandleOutsideHooks } from '@hooks/useHandleOutsideHooks';
import { styled } from 'styled-components';
import { vars } from 'token';

import { useSelectContext } from './Select.provider';

const ListContainer = styled.div<{ width?: string }>`
  width: ${({ width }) => width ?? '100%'};
  position: absolute;
  z-index: 2;
  top: 100%;
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

export const SelectItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.25s;

  &:hover {
    background-color: ${vars.sementic.color.black10};
  }
`;

interface SelectListProps {
  width?: string;
}

export const SelectList = ({
  children,
  width,
}: PropsWithChildren & SelectListProps) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const selectContext = useSelectContext();
  const { isActivated } = selectContext;

  useHandleOutsideHooks(selectRef, () => selectContext.setToggleOpen(false));

  if (!isActivated) return null;

  return (
    <ListContainer width={width} ref={selectRef}>
      <Typography variant="paragraph" color="black70">
        {selectContext.listLabel}
      </Typography>
      {children}
    </ListContainer>
  );
};
