import { openFetchClient } from '@market-duck/apis/fetchClient';
import { UserLoginProviderType } from '@market-duck/types/user';
import { IAPIResponse, NetworkResultType } from '@market-duck/types/api';

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
}

export const loginAPI = new LoginAPI();
