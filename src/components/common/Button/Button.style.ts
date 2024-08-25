import styled from 'styled-components';
import { vars } from 'token';

export const CommonButton = styled.button<{
  size: 'small' | 'medium';
  variant:
    | 'outline'
    | 'fill'
    | 'fillGray'
    | 'text' | 'fillRed'
    | 'task'
    | 'subTask'
    | 'quest';
  hasText: boolean;
  isSelect?: boolean;
}>`
  font-size: ${vars.sementic.typography['heading-5'].fontSize};
  font-weight: ${vars.sementic.typography['heading-5'].fontWeight};
  display: inline-flex;
  border-radius: 8px;
  justify-content: center;
  outline: none;
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
      case 'task':
        return vars.sementic.color.purple;
      case 'subTask':
        return vars.sementic.color.alertOrange;
      case 'quest':
        return vars.sementic.color.green;
      default:
        return vars.sementic.color.black;
    }
  }};

  background: ${({ variant }) => {
    switch (variant) {
      case 'outline':
      case 'task':
      case 'subTask':
      case 'quest':
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

  border-style: solid;
  border-width: 1px;
  border-color: ${({ variant }) => {
    switch (variant) {
      case 'outline':
        return vars.sementic.color.black10;
      case 'task':
        return vars.sementic.color.purple;
      case 'subTask':
        return vars.sementic.color.alertOrange;
      case 'quest':
        return vars.sementic.color.green;
      case 'fill':
      case 'fillGray':
      case 'text':
        return 'none';
      default:
        return vars.sementic.color.black10;
    }
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
      case 'task':
        return isSelect
          ? `background: ${vars.sementic.color.lightPurple};`
          : '';
      case 'subTask':
        return isSelect
          ? `background: ${vars.sementic.color.alertLightOrange};`
          : '';
      case 'quest':
        return isSelect ? `background: ${vars.sementic.color.lightGreen};` : '';
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
        case 'task':
          return 'linear-gradient(0deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.05) 100%), #E9E3FF';
        case 'subTask':
          return 'linear-gradient(0deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.05) 100%), #FFE9D8';
        case 'quest':
          return 'linear-gradient(0deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.05) 100%), #DFF4E3';
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
        case 'task':
          return vars.sementic.color.purple;
        case 'subTask':
          return vars.sementic.color.alertOrange;
        case 'quest':
          return vars.sementic.color.green;
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
