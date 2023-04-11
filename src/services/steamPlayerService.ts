import { SteamClient } from '../steamClient'
import { GetOwnedGamesParams, OwnedGamesResponse } from '../types/steamPlayer'

export class PlayerService {
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
   * @returns {Promise<OwnedGamesResponse>}
   */
  async getOwnedGames(
    params: GetOwnedGamesParams
  ): Promise<OwnedGamesResponse> {
    return await this.steamClient.get<OwnedGamesResponse>(
      'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001',
      params
    )
  }
}
