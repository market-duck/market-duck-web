import axios, { AxiosError } from 'axios';
import { loginAPI } from './loginAPI';

class Interceptor {
  async onReject(error: AxiosError<any>) {
    const { config, status, response } = error;

    //TODO:: other error status case

    const message = response?.data.message;
    if (status === 403 && message === 'EXPIRED ACCESS TOKEN') {
      const originReq = config!;

      // TODO: 유저 객체 위치 확인 및 수정 필요 (아마 sessionStorage일 가능성 높긴 함..)
      const userId = Number(sessionStorage.getItem('userId'));

      try {
        const { accessToken } = await loginAPI.reissueToken({ userId });

        sessionStorage.setItem('accessToken', accessToken);

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
