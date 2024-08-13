export interface ButtonProps {
  size: 'small' | 'medium';
  variant: 'outline' | 'fill' | 'fillGray' | 'text';
  hasIcon: boolean;
  isDisabled?: boolean;
  iconPosition?: 'left' | 'right';
  onClick: () => void;
  text: string;
}
