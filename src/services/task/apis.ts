import { AxiosResByData } from '@customTypes/common';
import { userApiInstance } from '@libs/axios/axios';
import { CreateTaskPayload } from '@services/swagger/output/data-contracts';
import { AxiosResponse } from 'axios';

interface TempTask {
  taskId: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  depth: number;
  progress: number;
  status: number;
}

export const getTaskList = async (projectId: number) => {
  const response: AxiosResponse<AxiosResByData<TempTask[]>> =
    await userApiInstance.get(`/node2/api/task/v2`, {
      params: {
        projectId,
      },
    });
  return response;
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

const getExtensionFromMimeType = (mimeType: string): string => {
  switch (mimeType) {
    case 'image/jpeg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/gif':
      return 'gif';
    case 'image/webp':
      return 'webp';
    default:
      return 'png';
  }
};

const convertBase64ToFile = (base64String: string, fileName: string): File => {
  const byteString = atob(base64String.split(',')[1]); // base64에서 데이터 부분 추출
  const mimeType = base64String.match(/data:(.*?);base64/)?.[1] || 'image/png';
  const extension = getExtensionFromMimeType(mimeType);
  const byteNumbers = new Array(byteString.length);

  const byteArray = new Uint8Array(byteNumbers);

  return new File([byteArray], `${fileName}.${extension}`, { type: mimeType });
};

export const createTask = async ({ ...payload }: CreateTaskPayload) => {
  console.log(payload);
  const formData = new FormData();
  const imageUrls = extractImageUrls(payload.data.description);

  let updatedDescription = payload.data.description;
  imageUrls.forEach((imageUrl) => {
    if (imageUrl.startsWith('data:image/')) {
      const uuid = randomUuid();
      const prevFileName = 'description-image';
      const extension = getExtensionFromMimeType(imageUrl);

      const newImageName = `${uuid}_${prevFileName}`;
      const newImageUrl = `https://user.sync-team.co.kr:30443/api/task/image?filename=/mnt/oraclevdb/task/description/${newImageName}.${extension}`;
      updatedDescription = updatedDescription?.replace(imageUrl, newImageUrl);
      try {
        const imgFile = convertBase64ToFile(imageUrl, newImageName);
        formData.append(`images`, imgFile);
      } catch (error) {
        console.error('이미지 변환 실패', error);
      }
    } else {
      console.log('이미지가 포함되지 않았습니다');
    }
  });

  const formDataList: CreateTaskPayload['data'] = {
    projectId: payload.data.projectId,
    title: payload.data.title,
    description: updatedDescription,
    startDate: payload.data.startDate,
    endDate: payload.data.endDate,
    parentTaskId: payload.data.parentTaskId,
    status: payload.data.status,
  };

  const newTask = new Blob([JSON.stringify(formDataList)], {
    type: 'application/json',
  });

  if (payload.data.thumbnailIcon) {
    formDataList.thumbnailIcon = payload.data.thumbnailIcon;
  }

  formData.append('data', newTask);

  if (payload.thumbnailImage) {
    formData.append('thumbnailImage', payload.thumbnailImage);
  }
  return userApiInstance.post('/user/api/task/v1', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  // formData.append('data', jsonBlob);
  // return requiredJwtTokeninstance.post('/user/api/task/v1', formData);
};

export const getTaskChildren = async (taskId: number) => {
  return userApiInstance.get(`/api/task/v1/${taskId}`);
};
