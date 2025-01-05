import { CommonButton } from './Button.style';
import { ButtonProps } from './Button.types';

/**
 * Button component
 * @param size - 사이즈를 나타냅니다. 'small' | 'medium'  기본은 'medium' 입니다.
 * @param variant - style을 나타냅니다.
 * @param hasIcon - icon 존재 여부를 나타냅니다.
 * @param isDisabled - 버튼 비활성화 여부를 나타냅니다.
 * @param iconPosition - icon 위치를 나타냅니다. 'left' | 'right' 기본은 'left' 입니다.
 * @param onClick - 클릭 이벤트를 나타냅니다.
 * @param text - 버튼 텍스트를 나타냅니다.
 * @param isSelect - 선택 여부를 나타냅니다.
 * @param fullWidth - 전체 너비를 나타냅니다.
 */

export const Button = ({
  size = 'medium',
  variant,
  $hasIcon = true,
  $isDisabled = false,
  $iconPosition = 'left',
  onClick,
  $renderIcon,
  text,
  $isSelect,
  $fullWidth,
}: ButtonProps) => (
  <CommonButton
    $fullWidth={$fullWidth}
    $hasText={!!text}
    size={size}
    $variant={variant}
    disabled={$isDisabled}
    onClick={onClick}
    $isSelect={$isSelect}
  >
    {$hasIcon && $iconPosition === 'left' && $renderIcon}
    {text}
    {$hasIcon && $iconPosition === 'right' && $renderIcon}
  </CommonButton>
);
