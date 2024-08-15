import { InputHTMLAttributes } from 'react';

export type Variant = 'outlined' | 'underlined' | 'search';

export interface TextfieldProps extends InputHTMLAttributes<HTMLInputElement> {
  isValid: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  label?: string;
  variant: Variant;
  width?: string;
}
