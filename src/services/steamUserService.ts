import { SteamClient } from '../steamClient'
import {
  IFriend,
  IGetFriendListParams,
  IGetPlayerSummariesParams,
  IGetPlayerSummariesResponse,
  IPlayerSummary,
} from '../types/ISteamUser'

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
   * @param params {IGetPlayerSummariesParams}
   *
   * @returns {Promise<IPlayerSummary[]>}
   */
  async getPlayerSummaries(
    params: IGetPlayerSummariesParams
  ): Promise<IPlayerSummary[]> {
    const { steamids, format = 'json' } = params

    const data = await this.steamClient.get<IGetPlayerSummariesResponse>(
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
   * @param params {IGetFriendListParams}
   *
   * @returns {Promise<IFriend[]>}
   */
  async getFriendList(params: IGetFriendListParams): Promise<IFriend[]> {
    const { steamid, relationship = 'all', format = 'json' } = params

    const data = await this.steamClient.get<{
      friendslist: { friends: IFriend[] }
    }>(`${API_BASE_URL}/GetFriendList/v0001/`, {
      steamid,
      relationship,
      format,
    })

    return data.friendslist.friends
  }
}
