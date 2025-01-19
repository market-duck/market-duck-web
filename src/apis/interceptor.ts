import { APIErrorResponse } from '@market-duck/apis/models/errorModel';
import axios, { AxiosError } from 'axios';
import { loginAPI } from './loginAPI';

class Interceptor {
  async onReject(error: AxiosError<APIErrorResponse>) {
    const { config, response } = error;

    //TODO:: other error status case
    const code = response?.data.code;
    const status = response?.status;
    if (status === 403 && code === 14004) {
      const originReq = config!;

      const userId = Number(localStorage.getItem('userId'));

      try {
        const { accessToken } = await loginAPI.reissueToken({ userId });

        localStorage.setItem('accessToken', accessToken);
        originReq.headers.Authorization = accessToken;
        return axios(originReq);
      } catch (err) {
        localStorage.clear();
        location.replace('/login');
      }
    }
    return Promise.reject(error);
  }
}

export const interceptor = new Interceptor();
