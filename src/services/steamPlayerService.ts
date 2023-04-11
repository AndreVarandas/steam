import { SteamClient } from '../steamClient'
import {
  GetOwnedGamesParams,
  GetOwnedGamesResponse,
} from '../types/steamPlayer'

/**
 * SteamPlayerService provides access to Steam Player API methods.
 */
export class SteamPlayerService {
  constructor(private steamClient: SteamClient) {}

  /**
   * GetOwnedGames returns a list of games a player owns along with some playtime information,
   * if the profile is publicly visible.
   * Private, friends-only, and other privacy settings are not supported unless
   * you are asking for your own personal details
   * (ie the WebAPI key you are using is linked to the steamid you are requesting).
   *
   * @param params {GetOwnedGamesParams}
   *
   * @returns {Promise<GetOwnedGamesResponse>}
   */
  async getOwnedGames(
    params: GetOwnedGamesParams
  ): Promise<GetOwnedGamesResponse> {
    const {
      steamid,
      includeAppInfo = true,
      includePlayedFreeGames = true,
      appIdsFilter = [],
      format = 'json',
    } = params

    return await this.steamClient.get<GetOwnedGamesResponse>(
      'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001',
      {
        steamid,
        include_appinfo: includeAppInfo,
        include_played_free_games: includePlayedFreeGames,
        appids_filter: appIdsFilter.join(','),
        format,
      }
    )
  }
}
