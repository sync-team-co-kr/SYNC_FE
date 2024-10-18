export interface InputProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelText?: string;
  placeholderText: string;
  isDisabled?: boolean;
}
