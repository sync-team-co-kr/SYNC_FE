import { AxiosResByData } from '@customTypes/common';
import { requiredJwtTokeninstance } from '@libs/axios/axios';
import { CreateTaskRequestDto } from '@services/swagger/output/data-contracts';
import { AxiosResponse } from 'axios';

/**
 * 업무를 생성하는 API
 * @param newTask: {
 *  title: string;
 *  description?: string;
 *  startDate?: string;
 *  endDate?: string;
 *  status: number;
 *  parentTaskId?: number;
 *  projectId: number;
 *  images?: File[];
 * }
 * @returns {
 *  result: boolean;
 *  message: string;
 * }
 */

export const createTask = async (newTask: CreateTaskRequestDto) => {
  try {
    // FormData 객체 생성
    const formData = new FormData();

    // CreateTaskRequestDto의 필드를 FormData에 추가
    formData.append('title', newTask.title);
    if (newTask.description) {
      formData.append('description', newTask.description);
    }
    if (newTask.startDate) {
      formData.append('startDate', newTask.startDate);
    }
    if (newTask.endDate) {
      formData.append('endDate', newTask.endDate);
    }
    formData.append('status', newTask.status.toString());
    formData.append('projectId', newTask.projectId.toString());

    if (newTask.parentTaskId !== undefined) {
      formData.append('parentTaskId', newTask.parentTaskId.toString());
    }

    if (newTask.images && newTask.images.length > 0) {
      newTask.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }

    // API 요청
    const createTaskResponse: AxiosResponse<AxiosResByData<any>> = await requiredJwtTokeninstance.post(
      '/user/api/task/v1',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    console.log('업무가 성공적으로 생성되었습니다:', createTaskResponse.data);

    return createTaskResponse.data;
  } catch (error) {
    console.error('업무 생성 중 오류 발생:', error);
    throw error; // 오류 발생 시 호출자에게 예외를 던집니다.
  }
};
