import { SteamClient } from '../steamClient'
import {
  Friend,
  GetFriendListParams,
  GetPlayerSummariesParams,
  GetPlayerSummariesResponse,
  PlayerSummary,
} from '../types/steamUser'

const API_BASE_URL = 'http://api.steampowered.com/ISteamUser'

/**
 *  Steam provides API calls to provide information about Steam users.
 */
export class SteamUserService {
  private steamClient: SteamClient

  constructor(steamClient: SteamClient) {
    this.steamClient = steamClient
  }

  /**
   * Returns basic profile information for a list of 64-bit Steam IDs.
   *
   * @param params {GetPlayerSummariesParams}
   *
   * @returns {Promise<PlayerSummary[]>}
   */
  async getPlayerSummaries(
    params: GetPlayerSummariesParams
  ): Promise<PlayerSummary[]> {
    const { steamids, format = 'json' } = params

    const data = await this.steamClient.get<GetPlayerSummariesResponse>(
      `${API_BASE_URL}/GetPlayerSummaries/v0002/`,
      {
        steamids: steamids.join(','),
        format,
      }
    )

    return data.response.players
  }

  /**
   * Returns the friend list of any Steam user,
   * provided their Steam Community profile visibility is set to "Public". (v1)
   *
   * @param params {GetFriendListParams}
   *
   * @returns {Promise<Friend[]>}
   */
  async getFriendList(params: GetFriendListParams): Promise<Friend[]> {
    const { steamid, relationship = 'all', format = 'json' } = params

    const data = await this.steamClient.get<{
      friendslist: { friends: Friend[] }
    }>(`${API_BASE_URL}/GetFriendList/v0001/`, {
      steamid,
      relationship,
      format,
    })

    return data.friendslist.friends
  }
}
