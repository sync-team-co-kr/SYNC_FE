import { HTMLInputTypeAttribute, Ref, forwardRef } from 'react';

import { ReactComponent as ProfileProject } from '@assets/Profile_Project.svg';
import { ReactComponent as Search } from '@assets/searchSM.svg';

import {
  Element,
  ElementHelperText,
  Label,
  TextfieldContainer,
  TextfieldInput,
  Wrapper,
} from './Textfield.style';
import { TextfieldProps } from './Textfield.types';

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
    width = '100%',
  }: TextfieldProps,
  ref: Ref<HTMLDivElement>,
  type: HTMLInputTypeAttribute = 'text',
) => {
  const isSearch = variant === 'search';

  return (
    <Element ref={ref} width={width}>
      {!isSearch && <Label>{label}</Label>}
      <Wrapper>
        {!isSearch && <ProfileProject width={32} height={32} />}
        <TextfieldContainer variant={variant} isValid={isValid}>
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
      {isValid && <ElementHelperText>{helperText}</ElementHelperText>}
    </Element>
  );
};

export default forwardRef(Textfield);
