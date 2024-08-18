import styled, { css } from 'styled-components';
import { vars } from 'token';

import { Variant } from './Textfield.types';

export const Element = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
`;

export const Label = styled.label`
  gap: 5px;
  font-size: ${vars.sementic.typography['small-text-b'].fontSize};
  font-weight: ${vars.sementic.typography['small-text-b'].fontWeight};
  line-height: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${vars.sementic.color.black35};
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const outlinedInputContainerStyle = css({
  border: `1px solid ${vars.sementic.color.black20}`,
  borderRadius: '4px',
  boxSizing: 'border-box',
  width: '100%',
  display: 'flex',

  alignItems: 'center',
  backgroundColor: vars.sementic.color.white,

  gap: '8px',

  '&:hover': {
    borderColor: vars.sementic.color.black70,
    backgroundColor:
      'linear-gradient(0deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.05) 100%), #FFF;',
  },

  '&:disabled': {
    backgroundColor: vars.sementic.color.black10,
    borderColor: vars.sementic.color.black20,
    color: vars.sementic.color.black20,
  },
});

const underlinedInputContainerStyle = css({
  borderBottom: `1px solid ${vars.sementic.color.black20}`,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',

  '&:hover': {
    borderColor: vars.sementic.color.black70,
  },
});

const searchInputContainerStyle = css({
  border: `1px solid ${vars.sementic.color.black20}`,
  borderRadius: '8px',
  boxSizing: 'border-box',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: vars.sementic.color.white,

  '&:hover': {
    borderColor: vars.sementic.color.black70,
    backgroundColor:
      'linear-gradient(0deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.05) 100%), #FFF;',
  },

  '&:disabled': {
    backgroundColor: vars.sementic.color.black10,
    borderColor: vars.sementic.color.black20,
    color: vars.sementic.color.black20,
  },
});

export const TextfieldContainer = styled.div<{
  variant: Variant;
  isValid?: boolean;
  disabled?: boolean;
}>`
  ${(props) => {
    switch (props.variant) {
      case 'outlined':
        return outlinedInputContainerStyle;
      case 'underlined':
        return underlinedInputContainerStyle;
      case 'search':
        return searchInputContainerStyle;
      default:
        return outlinedInputContainerStyle;
    }
  }}
  padding: 12px 8px;
  width: 100%;
  display: flex;
  align-items: center;

  transition: all 0.3s ease-in;

  ${(props) =>
    props.isValid &&
    `border-color: ${vars.sementic.color.negativeRed};
    `}

  &:focus-within {
    border-color: ${vars.sementic.color.primaryOrange};
    border-width: 2px;
  }

  &:focus {
    border-color: ${vars.sementic.color.primaryOrange};
    border-width: 2px;
  }

  &:hover {
    color: ${vars.sementic.color.black};
  }

  ${(props) =>
    props.disabled &&
    `background-color: ${vars.sementic.color.black10};
    border-color: ${vars.sementic.color.black20};
    color: ${vars.sementic.color.black20};
    cursor: not-allowed;

    &:hover {
      background-color: ${vars.sementic.color.black10};
      border-color: ${vars.sementic.color.black20};
      color: ${vars.sementic.color.black20};
    }
    `}
`;

export const TextfieldInput = styled.input<{ isValid?: boolean }>`
  width: 100%;
  padding: 0 12px;

  border: none;

  font-size: ${vars.sementic.typography.paragraph.fontSize};
  font-weight: ${vars.sementic.typography.paragraph.fontWeight};
  line-height: 20px;

  ${(props) =>
    props.isValid
      ? `color: ${vars.sementic.color.negativeRed};`
      : `color: ${vars.sementic.color.black};`}

  outline: none;
  box-sizing: border-box;

  &:disabled {
    color: ${vars.sementic.color.black20};
  }
`;

export const ElementHelperText = styled.span<{ isValid: boolean }>`
  color: ${vars.sementic.color.positiveBlue};

  ${(props) =>
    props.isValid
      ? `color: ${vars.sementic.color.negativeRed};`
      : `color: ${vars.sementic.color.black};`}

  font-size: 12px;
  font-weight: 400;
  line-height: normal;
`;
