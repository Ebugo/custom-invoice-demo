import axios from 'axios';
import { getApiBaseUrl } from './getBaseUrl';

export const baseApiUrl = getApiBaseUrl();

const httpService = axios.create({ baseURL: baseApiUrl });

httpService.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    if (error?.response?.status === 401) {
      //TODO: handle error
    }

    throw error?.response?.data;
  }
);

export default httpService;
