import React from 'react';

export interface ButtonProps {
  size: 'small' | 'medium';
  variant:
    | 'outline'
    | 'fill'
    | 'fillGray'
<<<<<<< HEAD
    | 'text' | 'fillRed'
    | 'task'
    | 'subTask'
    | 'quest';
  hasIcon?: boolean;
=======
    | 'text'
    | 'task'
    | 'subTask'
    | 'quest'
    | 'fillRed';
  hasIcon: boolean;
>>>>>>> 8131ea3 (refactor: 버튼 스타일 추가)
  isDisabled?: boolean;
  iconPosition?: 'left' | 'right';
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text?: string;
  renderIcon?: React.ReactNode;
  isSelect?: boolean;
}
