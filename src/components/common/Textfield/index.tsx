import { HTMLInputTypeAttribute, Ref, forwardRef } from 'react';

import projectDefaultImg from '@assets/project-default.png';
import { ReactComponent as Search } from '@assets/searchSM.svg';
import ProfileDropdown from '@components/dropdown/ProfileDropdown';
import styled from 'styled-components';

import {
  Element,
  ElementHelperText,
  Label,
  TextfieldContainer,
  TextfieldInput,
  Wrapper,
} from './Textfield.style';
import { TextfieldProps } from './Textfield.types';

const InitialIcon = styled.span`
  color: #f24b4b;
  font-size: 16px;
  text-transform: uppercase;
  font-family: Roboto;
`;

export const Textfield = (
  {
    placeholder,
    value,
    onChange,
    disabled,
    isValid,
    helperText,
    variant = 'outlined',
    label,
    hasIcon,
    initialValue,
    width = '100%',
    selectIcon,
    selectIconOnClick,
    selectIconValue,
  }: TextfieldProps,
  ref: Ref<HTMLDivElement>,
  type: HTMLInputTypeAttribute = 'text',
) => {
  const isSearch = variant === 'search';
  return (
    <Element ref={ref} width={width}>
      {label && (
        <Label>
          {initialValue && <InitialIcon>*</InitialIcon>}
          {label}
        </Label>
      )}
      <Wrapper>
        {hasIcon && <img src={projectDefaultImg} alt="프로젝트 기본 이미지" />}
        {selectIcon && (
          <ProfileDropdown
            selectIconValue={selectIconValue as string}
            selectIconOnClick={selectIconOnClick as (icon: string) => void}
          />
        )}
        <TextfieldContainer
          disabled={disabled}
          $variant={variant}
          isValid={isValid}
        >
          <TextfieldInput
            isValid={isValid}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            type={type}
          />
          {isSearch && <Search width={18} height={18} />}
        </TextfieldContainer>
      </Wrapper>
      {isValid && (
        <ElementHelperText isValid={isValid}>{helperText}</ElementHelperText>
      )}
    </Element>
  );
};

export default forwardRef(Textfield);
