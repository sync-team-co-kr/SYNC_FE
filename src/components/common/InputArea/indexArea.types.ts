export interface InputProps {
  value: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  labelText?: string;
  placeholderText: string;
  isDisabled?: boolean;
}
