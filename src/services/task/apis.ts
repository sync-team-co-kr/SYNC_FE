import { requiredJwtTokeninstance } from '@libs/axios/axios';
import { CreateTaskPayload } from '@services/swagger/output/data-contracts';

export const getTaskList = async (projectId: number) => {
  return requiredJwtTokeninstance.get(
    `http://150.136.153.235:31585/api/task/v2?projectId=${projectId}`,
  );
};

const randomUuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.floor(Math.random() * 16);
    const v = c === 'x' ? r : (r % 4) + 8;
    return v.toString(16);
  });
};

const extractImageUrls = (description: string | undefined): string[] => {
  if (!description) {
    return [];
  }
  const regex = /<img[^>]+src="([^">]+)"/g;

  const matches = [...description.matchAll(regex)];

  return matches.map((match) => match[1]);
};

export const createTask = async ({ ...payload }: CreateTaskPayload) => {
  const formData = new FormData();
  const imageUrls = extractImageUrls(payload.data.description);
  const titleImage = payload.titleimage;
  console.log('titleImage', titleImage);

  let updatedDescription = payload.data.description;

  imageUrls.forEach((imageUrl) => {
    if (imageUrl.startsWith('data:image/')) {
      // uuid 생성 및 파일명 처리
      const uuid = randomUuid();
      const fileName = imageUrl.split('/').pop()?.split(';')[0] || 'image.png';
      const newImageName = `${uuid}_${fileName}`;

      // 이미지 경로 업데이트
      const newImageUrl = `http://150.136.153.235:31585/mnt/oraclevdb/task/description/${newImageName}`;
      updatedDescription = updatedDescription?.replace(imageUrl, newImageUrl);

      // base64 -> Blob 변환
      try {
        const base64Data = imageUrl.split(',')[1];
        const contentType =
          imageUrl.match(/data:(.*?);base64/)?.[1] || 'image/png';
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);

        /* eslint-disable no-plusplus */
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const imageFile = new File([byteArray], newImageName, {
          type: contentType,
        });

        // formData에 이미지 추가
        formData.append(`images`, imageFile, newImageName);
      } catch (error) {
        console.error('이미지 변환 실패', error);
      }
    } else {
      console.error('이미지 경로가 잘못되었습니다.', imageUrl);
    }
  });

  const formDataList = {
    projectId: payload.data.projectId,
    title: payload.data.title,
    description: updatedDescription,
    startDate:
      payload.data.startDate instanceof Date ? payload.data.startDate : null,
    endDate: payload.data.endDate instanceof Date ? payload.data.endDate : null,
  };

  formData.append('data', JSON.stringify(formDataList));

  return requiredJwtTokeninstance.post('/user/api/task/v1', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getTaskChildren = async (taskId: number) => {
  return requiredJwtTokeninstance.get(`/api/task/v1/${taskId}`);
};
