import { useSearchParams } from 'react-router-dom';

export const Oauth = () => {
  const [searchParams] = useSearchParams();

  // TODO: kakao code 분리
  //http://localhost:5173/oauth?code=onKqAqhwwMj8GVt4D-09cDkYaYulH62CNUpiDTiJKjQoA-DS03ePWwAAAAQKKiURAAABkfS4xVyoblpFv_zasg
  const code = searchParams.get('code');

  //TODO:: google access token 분리 방식
  // const startIndex = url.indexOf('#access_token') + 14;
  // const endIndex = url.indexOf('&', startIndex);
  // accessToken = url.substring(startIndex, endIndex);

  //~ Google redirect시 url 예시
  //http://localhost:5173/oauth#access_token=ya29.a0AcM612xw2tGCsJVjvPayocNEBlJOC0sGAYoEWBjXZpowdSG070VrVy70cp_3oj_IRwGPOp4o6vWZuQ3-0cydH2PDyqlq6nmKTFQQRPZtSOsFBq1TJSUXKYAl8EiXjapcJmx1qIoeQgz3U79mSCdSdPuPcRVeX10rAQaCgYKAVkSARESFQHGX2Mid9wdp9FNFDBYc-wx154f-Q0169&token_type=Bearer&expires_in=3599&scope=email%20https://www.googleapis.com/auth/userinfo.email%20openid&authuser=0&prompt=consent

  return <div>Oauth Page</div>;
};
