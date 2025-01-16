import React, { useState } from 'react';

import { Button } from '@components/common/Button';
import { useProjectActions } from '@libs/store/project/project';
import { styled } from 'styled-components';
import { vars } from 'token';

const UploadImageWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const UploadImagePreview = styled.div`
  width: 100%;
  height: 250px;
  img {
    width: 100%;
    height: 100%;
  }
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

const ButtonList = styled.div`
  width: 100%;
  padding: 12px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const CautionMessage = styled.span`
  font-size: ${vars.sementic.typography['small-text']};
  font-weight: 400;
  color: ${vars.sementic.color.black35};
`;

const ThumbnailImagePicker = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [thumbnailImage, setThumbnailImage] = useState<Blob | null>(null);
  const { setThumbnail } = useProjectActions();

  const handleChangeImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files![0];
    const fileBlob = new Blob([file], { type: file.type });
    setThumbnailImage(fileBlob);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (fileReaderEvent) => {
      if (fileReaderEvent.target) {
        const previewImageUrl = fileReaderEvent.target.result as string;
        setPreviewImage(previewImageUrl);
      }
    };
  };

  const handleUploadThumbnail = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (thumbnailImage) setThumbnail('I', thumbnailImage);
  };

  const cancelUploadThumbnail = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPreviewImage(null);
    setThumbnailImage(null);
  };

  return (
    <UploadImageWrapper>
      <UploadImagePreview>
        {previewImage && <img src={previewImage} alt="미리 보기 이미지" />}
      </UploadImagePreview>
      <UploadImageForm>
        <input
          id="thumbnail"
          type="file"
          accept="image/*"
          onChange={handleChangeImageFile}
        />
        <label htmlFor="thumbnail">파일 업로드</label>
      </UploadImageForm>
      <CautionMessage>권장 규격은 250 X 250 픽셀입니다.</CautionMessage>
      <ButtonList>
        <Button
          size="medium"
          text="확인"
          variant="fillGray"
          onClick={handleUploadThumbnail}
        />
        <Button
          size="medium"
          text="취소"
          variant="text"
          onClick={cancelUploadThumbnail}
        />
      </ButtonList>
    </UploadImageWrapper>
  );
};

export default ThumbnailImagePicker;
