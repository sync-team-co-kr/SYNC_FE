export interface SelectProviderProps {
  value: string;
  type: 'checkbox' | 'select';
  hasSearch?: boolean;
  label?: string;
  listLabel?: string;
  isEssential?: boolean;
  isActivated?: boolean;
  setValue: (value: any[] | any) => void;
}
