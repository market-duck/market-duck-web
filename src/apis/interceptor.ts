import axios, { AxiosError } from 'axios';
import { loginAPI } from './loginAPI';

class Interceptor {
  async onReject(error: AxiosError<any>) {
    const { config, status, response } = error;
    console.log('interceptor error', error);

    //TODO:: other error status case

    const code = response?.data.code;
    if (status === 403 && code === 14004) {
      const originReq = config!;

      const userId = Number(localStorage.getItem('userId'));

      try {
        const { accessToken } = await loginAPI.reissueToken({ userId });

        localStorage.setItem('accessToken', accessToken);

        originReq.headers.Authorization = accessToken;
        return axios(originReq);
      } catch (err) {
        //TODO: 토큰 재발급 실패 시 핸들링
      }
    }
    return Promise.reject(error);
  }
}

export const interceptor = new Interceptor();
