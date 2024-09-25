import { openFetchClient } from '@market-duck/apis/fetchClient';
import { IAPIResponse } from '@market-duck/types/api';
import { UserLoginProviderType } from '@market-duck/types/user';
import { envManager } from '@market-duck/utils/env';
import axios from 'axios';

class LoginAPI {
  constructor() {}
  async requestSignInAndUp({
    oauthAccessToken,
    loginType,
  }: {
    oauthAccessToken: string;
    loginType: UserLoginProviderType;
  }): Promise<{
    accessToken: string;
    userId: number;
  }> {
    const { data } = await openFetchClient.post<IAPIResponse<any>>(`/user/login`, {
      oauthAccessToken,
      loginType,
    });
    const { accessToken, userId } = data.data;

    return {
      accessToken,
      userId,
    };
  }

  //TODO:: response data check
  async reissueToken({ userId }: { userId: number }): Promise<{ accessToken: string }> {
    const { data } = await openFetchClient.post<IAPIResponse<any>>(`/user/reissue-token/${userId}`);

    const { accessToken } = data.data;

    return {
      accessToken,
    };
  }

  async getKakaoToken(code: string) {
    const reqUrl = 'https://kauth.kakao.com/oauth/token';

    const postData = {
      grant_type: 'authorization_code',
      client_id: envManager.getProviderKey('KAKAO'),
      redirect_uri: 'http://localhost:5173/oauth',
      code,
    };

    const res = await axios.post(reqUrl, postData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    });
    console.log(res);
    return res.data;
  }
}

export const loginAPI = new LoginAPI();
