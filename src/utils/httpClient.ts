import axios, { AxiosInstance, AxiosResponse } from 'axios'

/**
 * Singleton class to handle HTTP requests
 */
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

  public async get<T = unknown>(
    url: string,
    params?: Record<string, unknown>
  ): Promise<AxiosResponse<T>> {
    return await this.axiosInstance.get<T>(url, { params })
  }
}

export const httpClient = HttpClient.getInstance()
