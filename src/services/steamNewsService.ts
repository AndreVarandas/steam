import { SteamClient } from '../steamClient'
import {
  IGetNewsForAppParams,
  IGetNewsForAppResponse,
} from '../types/ISteamNews'

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
   * @param params {IGetNewsForAppParams}
   *
   * @returns {Promise<IGetNewsForAppResponse>}
   */
  async getNewsForApp(
    params: IGetNewsForAppParams
  ): Promise<IGetNewsForAppResponse> {
    const { appid, count, maxlength, format = 'json' } = params

    return this.steamClient.get<IGetNewsForAppResponse>(API_BASE_URL, {
      appid,
      count,
      maxlength,
      format,
    })
  }
}
