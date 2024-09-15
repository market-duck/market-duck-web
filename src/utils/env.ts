import { browserName, isMobile, isAndroid, isIOS, osName, osVersion, deviceType, OsTypes } from 'react-device-detect';

class EnvManager {
  constructor(private env: NodeJS.ProcessEnv) {}
  getApiUrl() {
    return this.env.API_URL;
  }

  getOpenApiUrl() {
    return this.env.OPEN_API_URL;
  }

  getAppOrigin() {
    //TODO:: env 생성 및 변경
    return this.env.NEEDER_APP_ORIGIN;
  }

  getBuildEnv() {
    return this.env.BUILD_ENV!;
  }
  isLocal() {
    return this.env.BUILD_ENV === 'local';
  }
  isDev() {
    return this.env.BUILD_ENV === 'dev';
  }
  isDevOrLocal() {
    return ['dev', 'local'].includes(this.env.BUILD_ENV ?? '');
  }
  isProd() {
    return this.env.BUILD_ENV === 'prod';
  }

  // getTestPageRoute() {
  //   return this.env.TEST_PAGE_ROUTE;
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
}
export const envManager = new EnvManager({ ...import.meta.env });
