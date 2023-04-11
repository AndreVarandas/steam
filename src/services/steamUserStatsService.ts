import { SteamClient } from '../steamClient'
import {
  AchievementPercentage,
  GetGlobalAchievementPercentagesForAppParams,
  GetGlobalAchievementPercentagesForAppResponse,
  GetPlayerAchievementsParams,
  GetPlayerAchievementsResponse,
  GetUserStatsForGameParams,
  GetUserStatsForGameResponse,
} from '../types/steamUserStats'

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
   * @param params {GetGlobalAchievementPercentagesForAppParams}
   *
   * @returns {Promise<AchievementPercentage[]>}
   */
  async getGlobalAchievementPercentagesForApp(
    params: GetGlobalAchievementPercentagesForAppParams
  ): Promise<AchievementPercentage[]> {
    const { gameid, format = 'json' } = params

    const response =
      await this.steamClient.get<GetGlobalAchievementPercentagesForAppResponse>(
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
   * @param params {GetUserStatsForGameParams}
   *
   * @returns {Promise<GetUserStatsForGameResponse>}
   */
  async getUserStatsForGame(
    params: GetUserStatsForGameParams
  ): Promise<GetUserStatsForGameResponse> {
    const { appid, steamid, language } = params

    const response = await this.steamClient.get<GetUserStatsForGameResponse>(
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
   * @param params {GetPlayerAchievementsParams}
   *
   * @returns {Promise<GetPlayerAchievementsResponse>}
   */
  async getPlayerAchievements(
    params: GetPlayerAchievementsParams
  ): Promise<GetPlayerAchievementsResponse> {
    const { appid, steamid, language } = params

    const response = await this.steamClient.get<GetPlayerAchievementsResponse>(
      `${API_BASE_URL}/GetPlayerAchievements/v0001`,
      {
        appid,
        steamid,
        l: language ? language : 'en',
      }
    )

    return response
  }
}
