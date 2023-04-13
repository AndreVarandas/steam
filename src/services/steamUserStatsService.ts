import { isAxiosError } from 'axios'

import { SteamClient } from '../steamClient'
import {
  IAchievementPercentage,
  IGetGlobalAchievementPercentagesForAppParams,
  IGetGlobalAchievementPercentagesForAppResponse,
  IGetPlayerAchievementsParams,
  IGetPlayerAchievementsResponse,
  IGetUserStatsForGameParams,
  IGetUserStatsForGameResponse,
} from '../types/ISteamUserStats'

const API_BASE_URL = 'http://api.steampowered.com/ISteamUserStats'

/**
 * Steam provides methods to fetch global stat information by game.
 */
export class SteamUserStatsService {
  private steamClient: SteamClient

  constructor(steamClient: SteamClient) {
    this.steamClient = steamClient
  }

  /**
   * Returns on global achievements overview of a specific game in percentages.
   *
   * @param params {IGetGlobalAchievementPercentagesForAppParams}
   *
   * @returns {Promise<IAchievementPercentage[]>}
   */
  async getGlobalAchievementPercentagesForApp(
    params: IGetGlobalAchievementPercentagesForAppParams
  ): Promise<IAchievementPercentage[]> {
    const { gameid, format = 'json' } = params

    const response =
      await this.steamClient.get<IGetGlobalAchievementPercentagesForAppResponse>(
        `${API_BASE_URL}/GetGlobalAchievementPercentagesForApp/v0002/`,
        {
          gameid,
          format,
        }
      )

    return response.achievementpercentages.achievements
  }

  /**
   * Returns a list of achievements for this user by app id (v2)
   *
   * @param params {IGetUserStatsForGameParams}
   *
   * @returns {Promise<IGetUserStatsForGameResponse>}
   */
  async getUserStatsForGame(
    params: IGetUserStatsForGameParams
  ): Promise<IGetUserStatsForGameResponse> {
    const { appid, steamid, language } = params

    const response = await this.steamClient.get<IGetUserStatsForGameResponse>(
      `${API_BASE_URL}/GetUserStatsForGame/v0002`,
      {
        appid,
        steamid,
        l: language ? language : 'en',
      }
    )

    return response
  }

  /**
   * Returns a list of achievements for this user by app id (v1)
   *
   * @param params {IGetPlayerAchievementsParams}
   *
   * @returns {Promise<IGetPlayerAchievementsResponse>}
   */
  async getPlayerAchievements(
    params: IGetPlayerAchievementsParams
  ): Promise<IGetPlayerAchievementsResponse> {
    const { appid, steamid, language } = params

    try {
      const response =
        await this.steamClient.get<IGetPlayerAchievementsResponse>(
          `${API_BASE_URL}/GetPlayerAchievements/v0001`,
          {
            appid,
            steamid,
            l: language ? language : 'en',
          }
        )

      return response
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 403) {
        throw new Error('The player profile is not public')
      }

      throw new Error('Failed to get player achievements')
    }
  }
}
