import styled from 'styled-components';
import { vars } from 'token';

export const CommonButton = styled.button<{
  size: 'small' | 'medium';
  variant: 'outline' | 'fill' | 'fillGray' | 'text' | 'fillRed';
  hasText: boolean;
  isSelect?: boolean;
}>`
  font-size: ${vars.sementic.typography['heading-5'].fontSize};
  font-weight: ${vars.sementic.typography['heading-5'].fontWeight};
  display: inline-flex;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: ${({ hasText }) => (hasText ? '12px 16px' : '12px')};
  height: ${({ size }) => (size === 'small' ? '36px' : '42px')};

  color: ${({ variant }) => {
    switch (variant) {
      case 'outline':
      case 'fillGray':
      case 'text':
        return vars.sementic.color.black70;
      case 'fill':
        return vars.sementic.color.black;
      case 'fillRed':
        return vars.sementic.color.white;
      default:
        return vars.sementic.color.black;
    }
  }};

  background: ${({ variant }) => {
    switch (variant) {
      case 'outline':
        return vars.sementic.color.white;
      case 'fill':
        return vars.sementic.color.primaryOrange;
      case 'fillGray':
        return vars.sementic.color.black10;
      case 'fillRed':
        return vars.sementic.color.lightRed;
      case 'text':
        return 'transparent';
      default:
        return vars.sementic.color.primaryOrange;
    }
  }};

  border: ${({ variant }) => {
    return variant === 'outline'
      ? `1px solid ${vars.sementic.color.black10}`
      : 'none';
  }};

  cursor: pointer;
  transition:
    background 0.3s ease-in-out,
    color 0.3s ease-in-out;

  ${({ isSelect, variant }) => {
    switch (variant) {
      case 'outline':
        return isSelect ? `background: ${vars.sementic.color.black10};` : '';
      case 'fill':
        return isSelect
          ? `background: ${vars.sementic.color.primaryOrange};`
          : '';
      case 'fillGray':
        return isSelect ? `background: ${vars.sementic.color.black20};` : '';
      case 'text':
        return isSelect ? `background: ${vars.sementic.color.black10};` : '';
      default:
        return isSelect
          ? `background: ${vars.sementic.color.primaryOrange};`
          : '';
    }
  }};
  &:hover {
    background: ${({ variant }) => {
      switch (variant) {
        case 'outline':
          return 'linear-gradient(0deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.05) 100%), #FFF';
        case 'fill':
          return 'linear-gradient(0deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.05) 100%), #FFD880';
        case 'fillGray':
          return 'linear-gradient(0deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.05) 100%), #F4F4F4;';
        case 'fillRed':
          return 'linear-gradient(0deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.05) 100%), #ED6863;';
        case 'text':
          return 'transparent';
        default:
          return 'linear-gradient(0deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.05) 100%), #FFD880';
      }
    }};

    color: ${({ variant }) => {
      switch (variant) {
        case 'outline':
        case 'fillGray':
          return vars.sementic.color.black70;
        case 'fillRed':
          return vars.sementic.color.white;
        case 'fill':
        case 'text':
          return vars.sementic.color.black;
        default:
          return vars.sementic.color.black;
      }
    }};
  }

  &:disabled {
    background: ${({ variant }) => {
      switch (variant) {
        case 'outline':
          return vars.sementic.color.white;
        case 'fill':
        case 'fillGray':
          return vars.sementic.color.black10;
        case 'text':
          return 'transparent';
        default:
          return vars.sementic.color.black10;
      }
    }};

    color: ${vars.sementic.color.black20};
    cursor: not-allowed;
  }
`;
