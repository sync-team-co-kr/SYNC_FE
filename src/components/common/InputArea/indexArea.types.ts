export interface InputProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelFC: JSX.Element;
  placeholderText: string;
  isDisabled?: boolean;
}
