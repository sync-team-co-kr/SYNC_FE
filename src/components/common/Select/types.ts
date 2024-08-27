export interface SelectProviderProps {
  options: any[] | undefined;
  value: string;
  type: 'checkbox' | 'select';
  hasSearch?: boolean;
  label?: string;
  isOpen?: boolean;
}

export interface SelectListProps {
  onSelect: (value: any) => void;
}
