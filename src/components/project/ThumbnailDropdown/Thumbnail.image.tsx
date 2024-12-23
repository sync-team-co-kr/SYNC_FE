import React from 'react';

import { useProjectActions } from '@libs/store/project/project';
import { styled } from 'styled-components';
import { vars } from 'token';

const UploadImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const UploadImageForm = styled.div`
  width: 100%;
  padding: 12px;
  display: flex;
  justify-content: center;
  input {
    display: none;
  }
  label {
    width: 100%;
    padding: 8px 24px;
    border: 1px solid ${vars.sementic.color.black10};
    border-radius: 8px;
    font-size: ${vars.sementic.typography.paragraph};
    font-weight: 700;
    color: ${vars.sementic.color.black70};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: ${vars.sementic.color.black10};
    }
  }
`;

const CautionMessage = styled.span`
  font-size: ${vars.sementic.typography['small-text']};
  font-weight: 400;
  color: ${vars.sementic.color.black35};
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
        setThumbnail('I', readerResult);
      }
    };
  };

  return (
    <UploadImageWrapper>
      <UploadImageForm>
        <input
          id="thumbnail"
          type="file"
          accept="image/*"
          onChange={handleUploadThumbnail}
        />
        <label htmlFor="thumbnail">파일 업로드</label>
      </UploadImageForm>
      <CautionMessage>권장 규격은 250 X 250 픽셀입니다.</CautionMessage>
    </UploadImageWrapper>
  );
};

export default ThumbnailImagePicker;
