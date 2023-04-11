import { SteamClient } from '../steamClient'
import { GetNewsForAppParams, GetNewsForAppResponse } from '../types/steamNews'

const API_BASE_URL =
  'http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/'

/**
 * Steam provides methods to fetch news feeds for each Steam game.
 */
export class SteamNewsService {
  private steamClient: SteamClient

  constructor(steamClient: SteamClient) {
    this.steamClient = steamClient
  }

  /**
   * GetNewsForApp returns the latest of a game specified by its appID.
   *
   * @param params {GetNewsForAppParams}
   *
   * @returns {Promise<GetNewsForAppResponse>}
   */
  async getNewsForApp(
    params: GetNewsForAppParams
  ): Promise<GetNewsForAppResponse> {
    const { appid, count, maxlength, format = 'json' } = params

    return this.steamClient.get<GetNewsForAppResponse>(API_BASE_URL, {
      appid,
      count,
      maxlength,
      format,
    })
  }
}
