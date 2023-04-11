import axios, { AxiosInstance, AxiosResponse } from 'axios'

class HttpClient {
  private static instance: HttpClient
  private axiosInstance: AxiosInstance

  private constructor() {
    this.axiosInstance = axios.create()
  }

  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient()
    }
    return HttpClient.instance
  }

  public async get<T = any>(
    url: string,
    params?: Record<string, any>
  ): Promise<AxiosResponse<T>> {
    return await this.axiosInstance.get<T>(url, { params })
  }
}

export const httpClient = HttpClient.getInstance()
