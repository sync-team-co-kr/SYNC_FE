export interface ButtonProps {
  size: 'small' | 'medium';
  variant:
    | 'outline'
    | 'fill'
    | 'fillGray'
    | 'text'
    | 'task'
    | 'subTask'
    | 'quest';
  hasIcon?: boolean;
  isDisabled?: boolean;
  iconPosition?: 'left' | 'right';
  onClick: () => void;
  text?: string;
  renderIcon?: React.ReactNode;
  isSelect?: boolean;
}
