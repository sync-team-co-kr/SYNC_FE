import { ReactComponent as ArrowBottom } from '@assets/arrow-bottom.svg';
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

const SelectButtonContainer = styled.div<{ $isopen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 8px;
  border-radius: 4px;
  transition: all 0.25s ease-in;
  cursor: pointer;
  ${({ $isopen }) =>
    $isopen
      ? `border: 2px solid ${vars.sementic.color.primaryOrange}`
      : `border: 1px solid ${vars.sementic.color.black20}`};
`;

const SelectButtonLabel = styled.div`
  ${vars.sementic.typography.paragraph};
  ${vars.sementic.color.black70}
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
      $isopen={selectContext.isActivated || false}
      aria-selected={selectContext.isActivated}
      onClick={() => selectContext.setToggleOpen((prev) => !prev)}
    >
      <SelectButtonLabel>{selectContext.value}</SelectButtonLabel>
      <ArrowBottom width={18} height={18} />
    </SelectButtonContainer>
  );
};
