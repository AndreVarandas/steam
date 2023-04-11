import { httpClient } from './utils/httpClient'

/**
 * Class to handle Steam API requests,
 * using the provided API key.
 */
export class SteamClient {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  /**
   * Wrapper for GET requests.
   *
   * @param url {string}
   * @param params {Record<string, unknown>}
   *
   * @returns {Promise<T>}
   */
  async get<T>(url: string, params: Record<string, unknown>): Promise<T> {
    const response = await httpClient.get(url, {
      ...params,
      key: this.apiKey,
    })

    return response.data as T
  }
}
