export interface EditorProps {
  value: string | undefined;
  onChangeText: (text: string) => void;
  placeholder?: string;
}
