export interface SelectProviderProps {
  options: any[] | undefined;
  value: string;
  type: 'checkbox' | 'select';
  hasSearch?: boolean;
  label?: string;
  isOpen?: boolean;
  listLabel?: string;
}

export interface SelectListProps {
  onSelect: (value: any) => void;
}
