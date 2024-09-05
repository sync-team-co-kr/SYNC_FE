import React from 'react';

export interface ButtonProps {
  size: 'small' | 'medium';
  variant:
    | 'outline'
    | 'fill'
    | 'fillGray'
    | 'text'
    | 'fillRed'
    | 'task'
    | 'subTask'
    | 'quest';
  hasIcon?: boolean;
  isDisabled?: boolean;
  iconPosition?: 'left' | 'right';
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text?: string;
  renderIcon?: React.ReactNode;
  isSelect?: boolean;
  fullWidth?: boolean;
}
