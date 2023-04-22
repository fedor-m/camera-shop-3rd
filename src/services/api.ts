import axios, {
  AxiosInstance,
  AxiosError,
} from 'axios';
import {
  BACKEND_URL,
  REQUEST_TIMEOUT
} from '../const';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });
  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ error: string }>) => {
      throw error;
    }
  );
  return api;
};
