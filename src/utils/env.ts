import { UserLoginProviderType } from '@market-duck/types/user';
import { browserName, deviceType, isAndroid, isIOS, isMobile, osName, OsTypes, osVersion } from 'react-device-detect';

class EnvManager {
  constructor(private env: NodeJS.ProcessEnv) {}
  getApiUrl() {
    return this.env.VITE_API_URL;
  }

  getOpenApiUrl() {
    return this.env.VITE_OPEN_API_URL;
  }

  getAppOrigin() {
    //TODO:: env 생성 및 변경
    return this.env.VITE_NEEDER_APP_ORIGIN;
  }

  getBuildEnv() {
    return this.env.VITE_BUILD_ENV!;
  }
  isLocal() {
    return this.env.VITE_BUILD_ENV === 'local';
  }
  isDev() {
    return this.env.VITE_BUILD_ENV === 'dev';
  }
  isDevOrLocal() {
    return ['dev', 'local'].includes(this.env.VITE_BUILD_ENV ?? '');
  }
  isProd() {
    return this.env.VITE_BUILD_ENV === 'prod';
  }

  // getTestPageRoute() {
  //   return this.env.VITE_TEST_PAGE_ROUTE;
  // }

  getDeviceInfo() {
    //TODO:: 추후 필요시 unique값 구분을 위한 uuid
    return {
      deviceType,
      browserName,
      OsTypes,
      isMobile,
      isAndroid,
      isIOS,
      osName,
      osVersion,
      userAgent: navigator.userAgent,
    };
  }

  getProviderKey(providerType: UserLoginProviderType) {
    switch (providerType) {
      case 'KAKAO':
        return this.env.VITE_OAUTH_KAKAO_ID;
      case 'GOOGLE':
        return this.env.VITE_OAUTH_GOOGLE_ID;
      // case 'APPLE':
      //   return this.env.VITE_OAUTH_APPLE_ID;
    }
  }
}
export const envManager = new EnvManager({ ...import.meta.env });
