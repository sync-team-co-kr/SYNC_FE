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

  let updatedDescription = payload.data.description;

  imageUrls.forEach((imageUrl) => {
    const uuid = randomUuid();
    const fileName = imageUrl.split('/').pop();
    const newImageName = `${uuid}_${fileName}`;

    const newImageUrl = `http://150.136.153.235:30080/mnt/oraclevdb/task/description/${newImageName}`;
    updatedDescription = updatedDescription?.replace(imageUrl, newImageUrl);

    formData.append(`images`, newImageUrl);
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
