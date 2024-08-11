import { Cookies } from 'react-cookie';

import axios, { AxiosError, isAxiosError } from 'axios';
import config from 'config/config';

const cookies = new Cookies(null, { path: '/' });

export const publicInstance = axios.create({
  baseURL: config.backendUrl,
});

export const requiredJwtTokeninstance = axios.create({
  baseURL: config.backendUrl,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${cookies.get('JWT_TOKEN')}`,
  },
});

requiredJwtTokeninstance.interceptors.response.use(
  (response) => response,
  async (axiosError: AxiosError) => {
    const originalRequest = axiosError.config;

    if (
      isAxiosError<{ message: string }>(axiosError) &&
      axiosError.response &&
      originalRequest
    ) {
      const { data } = axiosError.response;
      console.log(data.message.split(' ').slice(0, 2).join(' '));
      if (data.message === 'JWT expired') {
        try {
          await axios.get(`${config.backendUrl}/api/user/auth`, {
            withCredentials: true,
          });
          return axios(originalRequest);
        } catch (error) {
          if (isAxiosError<{ message: string }>(error) && error.response) {
            if (data.message === 'JWT expired') {
              window.alert('토큰 유효기간 만료. 로그인 창으로 돌아갑니다.');
              window.location.href = '/login';
            }
          }
          Promise.reject(error);
        }
      }
    }
    return null;
  },
);
