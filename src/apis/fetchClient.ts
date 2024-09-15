import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { envManager } from '@market-duck/utils/env';

class FetchClient {
  private server: AxiosInstance;

  constructor(baseURL: string) {
    this.server = axios.create({
      baseURL,
    });

    this.server.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig) {
    const response: AxiosResponse<T> = await this.server.get(url, config);
    return response;
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    const response: AxiosResponse<T> = await this.server.post(url, data, config);
    return response;
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    const response: AxiosResponse<T> = await this.server.patch(url, data, config);
    return response;
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    const response: AxiosResponse<T> = await this.server.put(url, data, config);
    return response;
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig) {
    const response: AxiosResponse<T> = await this.server.delete(url, config);
    return response;
  }
}

export const fetchClient = new FetchClient(envManager.getApiUrl() as string);
export const openFetchClient = new FetchClient(envManager.getApiUrl() as string);