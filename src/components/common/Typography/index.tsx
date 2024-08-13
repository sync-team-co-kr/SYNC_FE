import { TypographyComponent } from './Typography.style';
import { TypographyProps } from './Typography.types';

export const Typography = ({ children, variant, color }: TypographyProps) => {
  return (
    <TypographyComponent variant={variant} color={color}>
      {children}
    </TypographyComponent>
  );
};
