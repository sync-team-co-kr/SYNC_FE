import { ReactComponent as ArrowBottom } from '@assets/arrow-bottom.svg';
import { Typography } from '@components/common/Typography';
import { styled } from 'styled-components';
import { vars } from 'token';

import { useSelectContext } from './Select.provider';

const EmojiButtonContainer = styled.div`
  display: inline-flex;
  width: fit-content;
  width: 32px;
  height: 32px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;

const SelectButtonContainer = styled.div<{ isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 8px;
  border-radius: 4px;
  transition: all 0.25s ease-in;
  cursor: pointer;
  ${({ isOpen }) =>
    isOpen
      ? `border: 2px solid ${vars.sementic.color.primaryOrange}`
      : `border: 1px solid ${vars.sementic.color.black20}`};
`;

interface SelectButtonProps {
  type?: 'select' | 'emoji';
}

export const SelectButton = ({ type }: SelectButtonProps) => {
  const selectContext = useSelectContext();

  if (type === 'emoji') {
    return (
      <EmojiButtonContainer
        aria-selected={selectContext.isActivated}
        onClick={() => selectContext.setToggleOpen((prev) => !prev)}
      >
        {selectContext.value}
      </EmojiButtonContainer>
    );
  }

  return (
    <SelectButtonContainer
      isOpen={selectContext.isActivated || false}
      aria-selected={selectContext.isActivated}
      onClick={() => selectContext.setToggleOpen((prev) => !prev)}
    >
      <Typography color="black70" variant="paragraph">
        {selectContext.value}
      </Typography>
      <ArrowBottom width={18} height={18} />
    </SelectButtonContainer>
  );
};
