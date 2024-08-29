import { PropsWithChildren } from 'react';

import { Typography } from '@components/common/Typography';
import { styled } from 'styled-components';
import { vars } from 'token';

import { useSelectContext } from './Select.provider';

const ListContainer = styled.div`
  width: 100%;
  position: absolute;
  z-index: 1;
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

export const SelectList = ({ children }: PropsWithChildren) => {
  const selectContext = useSelectContext();
  const { isActivated } = selectContext;

  if (!isActivated) return null;

  return (
    <ListContainer>
      <Typography variant="paragraph" color="black70">
        {selectContext.listLabel}
      </Typography>
      {children}
    </ListContainer>
  );
};
