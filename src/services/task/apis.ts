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

const convertBase64ToFile = (base64String: string, fileName: string): File => {
  const byteString = atob(base64String.split(',')[1]); // base64에서 데이터 부분 추출
  const mimeType = base64String.match(/data:(.*?);base64/)?.[1] || 'image/png';
  const byteNumbers = new Array(byteString.length);

  byteNumbers.forEach((_, i) => {
    byteNumbers[i] = byteString.charCodeAt(i);
  });

  const byteArray = new Uint8Array(byteNumbers);
  return new File([byteArray], fileName, { type: mimeType });
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
        const imageFile = convertBase64ToFile(imageUrl, newImageName);

        // formData에 이미지 추가
        formData.append(`images`, imageFile);
      } catch (error) {
        console.error('이미지 변환 실패', error);
      }
    } else {
      console.log('이미지가 포함되지 않았습니다');
    }
  });

  const formDataList = {
    projectId: payload.data.projectId,
    title: payload.data.title,
    description: updatedDescription,
    startDate:
      payload.data.startDate instanceof Date ? payload.data.startDate : null,
    endDate: payload.data.endDate instanceof Date ? payload.data.endDate : null,
    parentTaskId: payload.data.parentTaskId,
  };

  formData.append('data', JSON.stringify(formDataList));

  return requiredJwtTokeninstance.post('/user/api/task/v1', formData);
};

export const getTaskChildren = async (taskId: number) => {
  return requiredJwtTokeninstance.get(`/api/task/v1/${taskId}`);
};
