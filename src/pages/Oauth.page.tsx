import { loginAPI } from '@market-duck/apis/loginAPI';
import { userAPI } from '@market-duck/apis/userAPI';
import { userDataAtom } from '@market-duck/atoms/user.atom';
import { UserLoginProviderType } from '@market-duck/types/user';
import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { Loading } from '@market-duck/components/Loading/Loading';

export const Oauth = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const setUserData = useSetRecoilState(userDataAtom);

  useEffect(() => {
    loginProcess();
  }, []);

  //~ Google redirect시 url 예시
  //http://localhost:5173/oauth#access_token=ya29.a0AcM612xw2tGCsJVjvPayocNEBlJOC0sGAYoEWBjXZpowdSG070VrVy70cp_3oj_IRwGPOp4o6vWZuQ3-0cydH2PDyqlq6nmKTFQQRPZtSOsFBq1TJSUXKYAl8EiXjapcJmx1qIoeQgz3U79mSCdSdPuPcRVeX10rAQaCgYKAVkSARESFQHGX2Mid9wdp9FNFDBYc-wx154f-Q0169&token_type=Bearer&expires_in=3599&scope=email%20https://www.googleapis.com/auth/userinfo.email%20openid&authuser=0&prompt=consent

  const loginProcess = async () => {
    try {
      // TODO: kakao code 분리
      //http://localhost:5173/oauth?code=onKqAqhwwMj8GVt4D-09cDkYaYulH62CNUpiDTiJKjQoA-DS03ePWwAAAAQKKiURAAABkfS4xVyoblpFv_zasg
      const code = searchParams.get('code');

      //TODO:: google access token 분리 방식
      const url = location.hash;
      const startIndex = url.indexOf('#access_token') + 14;
      const endIndex = url.indexOf('&', startIndex);
      const googleAccessToken = url.substring(startIndex, endIndex);

      const requestData: {
        oauthAccessToken: null | string;
        loginType: null | UserLoginProviderType;
      } = {
        oauthAccessToken: null,
        loginType: null,
      };

      if (code) {
        const { access_token } = await loginAPI.getKakaoToken(code);
        requestData.oauthAccessToken = access_token;
        requestData.loginType = 'KAKAO';
      } else if (googleAccessToken) {
        requestData.oauthAccessToken = googleAccessToken;
        requestData.loginType = 'GOOGLE';
      }

      const { oauthAccessToken, loginType } = requestData;

      if (oauthAccessToken && loginType) {
        const { accessToken, userId } = await loginAPI.requestSignInAndUp({ oauthAccessToken, loginType });

        localStorage.setItem('accessToken', accessToken);

        const data = await userAPI.getUserById({ userId });

        setUserData(data);
        navigate('/signUp', { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Loading />
    </div>
  );
};
