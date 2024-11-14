import React from 'react';

import { useProjectActions } from '@libs/store/project/project';
import { styled } from 'styled-components';

const UploadImageForm = styled.div`
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  input {
    display: none;
  }
  label {
    padding: 8px 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ThumbnailImagePicker = () => {
  const { setThumbnail } = useProjectActions();

  const handleUploadThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files![0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const readerResult = reader.result;
      if (readerResult && typeof readerResult === 'string') {
        console.log(readerResult);
        setThumbnail('I', readerResult);
      }
    };
  };

  return (
    <UploadImageForm>
      <input
        id="thumbnail"
        type="file"
        accept="image/*"
        onChange={handleUploadThumbnail}
      />
      <label htmlFor="thumbnail">파일 업로드</label>
    </UploadImageForm>
  );
};

export default ThumbnailImagePicker;
