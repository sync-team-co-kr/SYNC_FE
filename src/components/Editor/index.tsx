import { useEffect, useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';

import Quill from 'quill';

import { EditorContainer } from './style';
import { EditorProps } from './types';

export const Editor = ({ value, onChangeText, placeholder }: EditorProps) => {
  const icons = Quill.import('ui/icons');
  const quillRef = useRef<ReactQuill>(null);

  icons.image = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <path d="M3.20407 15.5459L8.15147 10.5985C8.44849 10.3015 8.59699 10.153 8.76824 10.0974C8.91887 10.0484 9.08113 10.0484 9.23176 10.0974C9.40301 10.153 9.55152 10.3015 9.84853 10.5985L14.7629 15.5129M10.5 11.25L12.6515 9.09853C12.9485 8.80152 13.097 8.65301 13.2682 8.59737C13.4189 8.54842 13.5811 8.54842 13.7318 8.59737C13.903 8.65301 14.0515 8.80152 14.3485 9.09853L16.5 11.25M7.5 6.75C7.5 7.57843 6.82843 8.25 6 8.25C5.17157 8.25 4.5 7.57843 4.5 6.75C4.5 5.92157 5.17157 5.25 6 5.25C6.82843 5.25 7.5 5.92157 7.5 6.75ZM5.1 15.75H12.9C14.1601 15.75 14.7902 15.75 15.2715 15.5048C15.6948 15.289 16.039 14.9448 16.2548 14.5215C16.5 14.0402 16.5 13.4101 16.5 12.15V5.85C16.5 4.58988 16.5 3.95982 16.2548 3.47852C16.039 3.05516 15.6948 2.71095 15.2715 2.49524C14.7902 2.25 14.1601 2.25 12.9 2.25H5.1C3.83988 2.25 3.20982 2.25 2.72852 2.49524C2.30516 2.71095 1.96095 3.05516 1.74524 3.47852C1.5 3.95982 1.5 4.58988 1.5 5.85V12.15C1.5 13.4101 1.5 14.0402 1.74524 14.5215C1.96095 14.9448 2.30516 15.289 2.72852 15.5048C3.20982 15.75 3.83988 15.75 5.1 15.75Z" stroke="#636363" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  icons.link = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <path d="M15 9C15 5.68629 12.3137 3 9 3C5.68629 3 3 5.68629 3 9C3 12.3137 5.68629 15 9 15C10.2313 15 11.3761 14.6291 12.3286 13.9928L13.1607 15.241C11.9701 16.0364 10.5392 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9V10.125C16.5 11.5747 15.3247 12.75 13.875 12.75C12.9719 12.75 12.1752 12.2938 11.7029 11.5994C11.0206 12.3086 10.0618 12.75 9 12.75C6.92894 12.75 5.25 11.071 5.25 9C5.25 6.92894 6.92894 5.25 9 5.25C9.84435 5.25 10.6235 5.52907 11.2504 6H12.75V10.125C12.75 10.7463 13.2537 11.25 13.875 11.25C14.4963 11.25 15 10.7463 15 10.125V9ZM9 6.75C7.75733 6.75 6.75 7.75733 6.75 9C6.75 10.2427 7.75733 11.25 9 11.25C10.2427 11.25 11.25 10.2427 11.25 9C11.25 7.75733 10.2427 6.75 9 6.75Z" fill="#636363"/>
  </svg>`;

  useEffect(() => {
    if (value) {
      const editor = quillRef.current?.getEditor();
      editor?.clipboard.dangerouslyPasteHTML(value);
    }
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['image'],
          ['link'],
        ],
      },
    }),
    [],
  );

  return (
    <EditorContainer>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        modules={modules}
        placeholder={placeholder ?? '내용을 입력해주세요.'}
        onChange={onChangeText}
      />
    </EditorContainer>
  );
};
