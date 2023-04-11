import { httpClient } from './utils/httpClient'

export class SteamClient {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async get<T>(url: string, params: Record<string, any>): Promise<T> {
    const response = await httpClient.get(url, {
      ...params,
      key: this.apiKey,
    })
    return response.data
  }
}
